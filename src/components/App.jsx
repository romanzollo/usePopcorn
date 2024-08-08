import { useState, useEffect } from 'react';

import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import NumResults from './NumResults';
import MoviesBox from './MoviesBox';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

// import { tempWatchedData } from '../data/tempWatchedData';
// import { tempMovieData } from '../data/tempMovieData';

const KEY_API = '9bc3165a';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    // отслеживаем состояние поиска
    const [query, setQuery] = useState('');
    // отслеживаем состояние загрузки
    const [isLoading, setIsLoading] = useState(false);
    // отслеживаем ошибки при запросе на API
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY_API}&s=${query}`
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
            } catch (error) {
                console.log(error.message);

                setError(error.message);
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
    }, [query]);

    return (
        <>
            <NavBar movies={movies}>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <MoviesBox>
                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

                    {/* вариант без использования тернарного оператора */}
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </MoviesBox>
                <MoviesBox>
                    <WatchedSummary watched={watched} />
                    <WatchedMovieList watched={watched} />
                </MoviesBox>
            </Main>
        </>
    );
}
