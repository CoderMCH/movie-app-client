import "./movieView.scss";
import PropTypes from "prop-types"

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

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: {
            name: PropTypes.string
        },
        genre: {
            type: PropTypes.string
        },
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}
