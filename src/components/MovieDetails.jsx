import { useEffect, useState } from 'react';

import StarRating from '../utils/StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function MovieDetails({ selectedId, onCloseMovie, KEY_API }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
    }, [selectedId]);

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
                            <StarRating maxRating={10} size={24} />
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
