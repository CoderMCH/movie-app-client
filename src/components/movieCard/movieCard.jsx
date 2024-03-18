import { Card, CardBody } from "react-bootstrap";
import "./movieCard.scss";
import PropTypes from "prop-types";

export const MovieCard = (props) => {
    return <Card className="movieCard h-100 w-100" onClick={() => {
        props.onMovieClick();
    }}>
        <Card.Img variant="top" src={props.movie.imagePath} alt="" />
        <Card.Body>
            <Card.Title>{props.movie.title}</Card.Title>
            <Card.Text>{props.movie.genre.type}</Card.Text>
        </Card.Body>
    </Card>
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
