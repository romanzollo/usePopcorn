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

const KEY = '9bc3165a';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    // отслеживаем состояние загрузки
    const [isLoading, setIsLoading] = useState(false);
    // отслеживаем ошибки при запросе на API
    const [error, setError] = useState('');

    const query = 'aaaewwewew';

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
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
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    return (
        <>
            <NavBar movies={movies}>
                <Search />
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
