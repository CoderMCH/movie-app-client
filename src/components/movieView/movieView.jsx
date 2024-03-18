import "./movieView.scss";
import PropTypes from "prop-types"
import { Button, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Row className="movieView">
            <Col md={3}>
                <img src={movie.imagePath} alt="" />
            </Col>
            <Col md={9}>
                <div>Title: {movie.title}</div>
                <div>Director: {movie.director.name}</div>
                <div>Genre: {movie.genre.type}</div>
                <div>Description: {movie.description}</div>
            </Col>
            <Button variant="secondary" onClick={() => onBackClick()}>Back</Button>
        </Row>
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
