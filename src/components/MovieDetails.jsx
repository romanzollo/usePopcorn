import { useEffect, useState } from 'react';

import StarRating from '../utils/StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function MovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    KEY_API,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false); // состояние загрузки
    const [error, setError] = useState(''); // состояние ошибки
    const [userRating, setUserRating] = useState(''); // пользовательский рейтинг

    // проверка наличия фильма в списке просмотренных
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

    // получаем пользовательский рейтинг
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    // деструктуризация объекта movie
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Plot: plot,
        imdbRating,
        Runtime: runtime,
        Genre: genre,
        Director: director,
        Actors: actors,
        Released: released,
    } = movie;

    // добавляем фильм в список просмотренных
    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ')[0]), // убираем 'min' и превращаем в число
            userRating, // пользовательский рейтинг
        };

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY_API}&i=${selectedId}`
                );

                // если что-то пошло не так
                if (!res.ok)
                    throw new Error('Something went wrong with fething movies');

                const data = await res.json();

                // если запрашиваемый фильм не найден
                if (data.Response === 'False')
                    throw new Error('Movie not found');

                // до этого участка кода дойдет только если нет ошибок и фильм найден
                setMovie(data);
            } catch (error) {
                console.log(error.message);

                setError(error.message);
                // setMovie({});
            } finally {
                setIsLoading(false);
            }
        }
        getMovieDetails();
    }, [selectedId, KEY_API]);

    // эффект изменения title страницы при выборе фильма
    useEffect(() => {
        if (!title) return;

        document.title = `Movie | ${title}`;

        // очищаем title при размонтировании компонента
        return () => {
            document.title = 'usePopcorn';
            // console.log(`Clean up effect for movie ${title}`);
            // пример замыкания, clean up функция эффекта выполняется
            // после размонтирования компонента но переменная title
            // будет хранить значение выбранного фильма из за замыкания
            // ("Замыкание" - это способность функции запоминать переменные, которые были определены внутри родительской функции, даже после того, как родительская функция была выполнена)
        };
    }, [title]);

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button onClick={onCloseMovie} className="btn-back">
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />

                                    {/* пока пользователь не поставил рейтинг
                                        не показываем кнопку "Add to list"
                                    */}
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={() => handleAdd(movie)}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You already rated this movie{' '}
                                    {watchedUserRating}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Director by {director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}

export default MovieDetails;
