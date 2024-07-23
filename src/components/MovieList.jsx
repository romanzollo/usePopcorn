import { useState } from 'react';

import Movie from './Movie';

import { tempMovieData } from '../data/tempMovieData';

function MovieList() {
    const [movies, setMovies] = useState(tempMovieData);
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

export default MovieList;
