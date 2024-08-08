function MovieDetails({ selectedId, onCloseMovie }) {
    return (
        <div className="details">
            <button onClick={onCloseMovie} className="btn-back">
                &larr;
            </button>

            {selectedId}
        </div>
    );
}

export default MovieDetails;
