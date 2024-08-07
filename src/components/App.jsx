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

// import { tempWatchedData } from '../data/tempWatchedData';
// import { tempMovieData } from '../data/tempMovieData';

const KEY = '9bc3165a';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const query = 'matrix';

    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true);

            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            );

            const data = await res.json();
            setMovies(data.Search);

            setIsLoading(false);
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
                    {isLoading ? <Loader /> : <MovieList movies={movies} />}
                </MoviesBox>
                <MoviesBox>
                    <WatchedSummary watched={watched} />
                    <WatchedMovieList watched={watched} />
                </MoviesBox>
            </Main>
        </>
    );
}
