import "./movieView.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movieCard/movieCard";

export const MovieView = ({ movies }) => {
    let { id } = useParams();
    let selectedMovie = movies.find(movie => movie._id == id);
    return (
    !selectedMovie ? <>Movie not found</> :
    <>
        <Row className="movieView">
            <Col md={3}>
                <img src={selectedMovie.imagePath} alt="" />
            </Col>
            <Col md={9}>
                <div>Title: {selectedMovie.title}</div>
                <div>Director: {selectedMovie.director.name}</div>
                <div>Genre: {selectedMovie.genre.type}</div>
                <div>Description: {selectedMovie.description}</div>
            </Col>
            <Link to="/movies">
                <Button variant="secondary">Back</Button>
            </Link>
            </Row>
            <hr />
            <h2>Movies you may like</h2>
            <Row>{
                movies.filter(movie => movie.title != selectedMovie.title && movie.genre.type == selectedMovie.genre.type).map(movie => {
                    return <Col md={3} key={ movie._id }>
                        <Link to={`/movie/${movie._id}`}>
                            <MovieCard movie={ movie } />
                        </Link>
                    </Col> 
                })
            }</Row>
        </>
    );
};
