import "./movieView.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movieCard/movieCard";
import { API } from "../../functions/api";
import { useEffect, useState } from "react";

export const MovieView = ({ user, movies }) => {
    let { id } = useParams();
    let selectedMovie = movies.find(movie => movie._id == id);
    let [isFavorite, setIsFavorite] = useState(selectedMovie && user.favoriteMovies.find(favorite => selectedMovie._id == favorite));
    let [btnMesg, setBtnMesg] = useState(isFavorite ? "Remove from Favorite" : "Add to Favorite");
    useEffect(() => {
        let bool = selectedMovie && user.favoriteMovies.find(favorite => selectedMovie._id == favorite);
        setIsFavorite(bool);
        setBtnMesg(bool ? "Remove from Favorite" : "Add to Favorite");
    }, [selectedMovie])
    useEffect(() => {
        setBtnMesg(isFavorite ? "Remove from Favorite" : "Add to Favorite");
    }, [isFavorite])

    return (
    !selectedMovie ? <>Movie not found</> :
    <>
        <Row className="movieView" style={{position: "relative"}}>
            <Button style={{width: "auto", position: "absolute", top:"10px", right:"10px"}}
                onClick={ev => {
                    if (isFavorite) {
                        API.removeMovieToFavorite(user, selectedMovie, (favoriteMovies) => {
                            user.favoriteMovies = favoriteMovies;
                            localStorage.setItem("user", JSON.stringify(user));
                        })
                    } else {
                        API.addMovieToFavorite(user, selectedMovie, (favoriteMovies) => {
                            user.favoriteMovies = favoriteMovies;
                            localStorage.setItem("user", JSON.stringify(user));
                        });
                    }
                    setIsFavorite(!isFavorite);
                }}>{btnMesg}</Button>
            <Col md={3}>
                {/* why w-100 solve text overflow problem */}
                <img className="w-100" src={selectedMovie.imagePath} alt="" />
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
        }
        </Row>
    </>
    );
};
