import "./movieCard.scss";
import PropTypes from "prop-types";

export const MovieCard = (props) => {
    return <div className="movieCard" onClick={() => {
        props.onMovieClick();
    }} >
        <div><img src={ props.movie.imagePath } alt="" /></div>
        <div>{ props.nthMovie }: { props.movie.title }</div>
    </div>
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
