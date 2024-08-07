import { useState } from 'react';

import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import NumResults from './NumResults';
import MoviesBox from './MoviesBox';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';

import { tempWatchedData } from '../data/tempWatchedData';
import { tempMovieData } from '../data/tempMovieData';

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <>
            <NavBar movies={movies}>
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <MoviesBox>
                    <MovieList movies={movies} />
                </MoviesBox>
                <MoviesBox>
                    <WatchedSummary watched={watched} />
                    <WatchedMovieList watched={watched} />
                </MoviesBox>
            </Main>
        </>
    );
}
