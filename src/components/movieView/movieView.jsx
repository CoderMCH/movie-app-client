import "./movieView.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movieView">
            <div>
                <img src={movie.imagePath} />
            </div>
            <div>Title: {movie.title}</div>
            <div>Director: {movie.director.name}</div>
            <div>Genre: {movie.genre.type}</div>
            <div>Description: {movie.description}</div>

            <button onClick={() => onBackClick()}>Back</button>
        </div>
    );
};
