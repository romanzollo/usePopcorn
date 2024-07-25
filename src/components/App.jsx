import { useState } from 'react';

import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import NumResults from './NumResults';
import MoviesBox from './MoviesBox';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';

import StarRating from '../utils/StarRating';

import { tempWatchedData } from '../data/tempWatchedData';
import { tempMovieData } from '../data/tempMovieData';

function Test() {
    const [movieRating, setMovieRating] = useState(0);

    return (
        <div>
            <StarRating
                color="#ff7f50"
                maxRating={10}
                onSetRating={setMovieRating}
            />
            <p>This movie was rated {movieRating} stars</p>
        </div>
    );
}

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
            <StarRating
                maxRating={5}
                messages={['Terrable', 'Bad', 'Okay', 'Good', 'Amazing']}
            />
            <StarRating
                maxRating={5}
                size={24}
                color="red"
                className="test"
                defaultRating={3}
            />

            <Test />
        </>
    );
}
