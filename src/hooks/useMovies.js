import { useState, useEffect } from 'react';

const KEY_API = '9bc3165a';

export function useMovies(query, callback = () => {}) {
    const [movies, setMovies] = useState([]);
    // отслеживаем состояние загрузки
    const [isLoading, setIsLoading] = useState(false);
    // отслеживаем ошибки при запросе на API
    const [error, setError] = useState('');

    useEffect(() => {
        // будет вызываться только если существует
        // callback?.();

        // создаем AbortController для отмены запроса (которые могут занять много времени) при демонтировании компонента
        // избавляемся от 'race condition'
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY_API}&s=${query}`,
                    {
                        // AbortController имеет свойство signal
                        // передайте свойство signal опцией в метод fetch
                        // Метод fetch умеет работать с AbortController, он слушает событие abort на signal и отменяет запрос при получении сигнала
                        signal: controller.signal,
                    }
                );

                // если что-то пошло не так
                if (!res.ok)
                    throw new Error('Something went wrong with fething movies');

                const data = await res.json();

                // если запрашиваемый фильм не найден
                if (data.Response === 'False')
                    throw new Error('Movie not found');

                // до этого участка кода дойдет только если нет ошибок и фильм найден
                setMovies(data.Search);

                // так же очищаем ошибку вконце запроса так как используем AbortController
                setError('');
            } catch (error) {
                // выкидываем ошибку только если запрос был отменен не через AbortController
                // игнорируем ошибки при отмене запроса через AbortController
                if (error.name !== 'AbortError') {
                    console.log(error.message);
                    setError(error.message);
                }

                // setMovies([]);
            } finally {
                setIsLoading(false);
            }
        }

        // если запрос пустой или длина запроса меньше 3 - ничего не делаем
        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        fetchMovies();

        // отменяем запрос при демонтировании компонента
        return () => controller.abort();
    }, [query]);

    return { movies, isLoading, error };
}
