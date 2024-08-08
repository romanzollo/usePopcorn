// import { useState } from 'react';

import Movie from './Movie';

// import { tempMovieData } from '../data/tempMovieData';

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

export default MovieList;
