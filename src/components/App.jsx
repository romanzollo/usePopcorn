import { useState } from 'react';

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
import MovieDetails from './MovieDetails';

import { useMovies } from '../hooks/useMovies';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const KEY_API = '9bc3165a';

export default function App() {
    // отслеживаем состояние поиска
    const [query, setQuery] = useState('');

    // отслеживаем состояние выбранного фильма
    const [selectedId, setSelectedId] = useState(null);

    // custom hooks
    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], 'watched');

    // функция обработки выбора фильма
    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (selectedId === id ? null : id));
    }

    // функция обработки закрытия фильма
    function handleCloseMovie() {
        setSelectedId(null);
    }

    // функция добавления фильма в список просмотренных
    function handleAddToWatched(movie) {
        setWatched((watched) => [...watched, movie]);

        // 1й вариант добавления просмотренных фильмов в localStorage
        // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

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
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </MoviesBox>
                <MoviesBox>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddToWatched}
                            KEY_API={KEY_API}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </MoviesBox>
            </Main>
        </>
    );
}
