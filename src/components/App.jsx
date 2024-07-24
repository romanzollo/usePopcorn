import { useState } from 'react';

import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import NumResults from './NumResults';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';
import MovieList from './MovieList';

import { tempMovieData } from '../data/tempMovieData';

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <NavBar movies={movies}>
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <ListBox>
                    <MovieList movies={movies} />
                </ListBox>
                <WatchedBox />
            </Main>
        </>
    );
}
