import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { RegisterView } from "../registerView/registerView";
import { Button, Row, Col } from "react-bootstrap";

const appUrl = "https://mch-flix-app-813b2fce5e48.herokuapp.com"

export const MainView = () => {
    // user: { username: "", token: "" }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser && "username" in storedUser ? storedUser : null);

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch(appUrl + "/movies", {method: "GET", headers: { 'Authorization': `Bearer ${user?.token}` }})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            }).catch(err => {
                console.error(err);
            })
    }, [user?.token])

    if (!user) {
        return <Row className="justify-content-md-center">
            <Col md={5}>
                <LoginView url={appUrl} onLoggedIn={(err, user) => {
                    if (err) {
                        alert(`Login fail\nError: ${err}`);
                    } else {
                        alert(`Login success\nUsername: ${user.username}`)
                        setUser(user);
                    }
                }}/>
                <br></br>
                <RegisterView url={appUrl} onRegister={(err, username) => {
                    if (err) {
                        alert(`Register fail\nError: ${err}`);
                    } else {
                        alert(`Register success\nUsername: ${username}`);
                    }
                }}/>
            </Col>
        </Row>
    }

    const logoutBtn = <Button variant="warning" style={{ marginBottom: "5px" }}
        onClick={() => {
            localStorage.clear();
            setUser(null);
    }}>Logout</Button>

    if (selectedMovie) {
        return <>
            {logoutBtn}
            <MovieView className="h-100" movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <hr />
            <h2>Movies you may like</h2>
            <Row>{
                movies.filter(movie => movie.title != selectedMovie.title && movie.genre.type == selectedMovie.genre.type).map(movie => {
                    return <Col md={3} key={ movie._id }>
                        <MovieCard movie={ movie }
                            onMovieClick={() => {
                                setSelectedMovie(movie);
                            }} />
                    </Col> 
                })
            }</Row>
        </>
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    
    return (
        <>
            {logoutBtn}
            <Row>
            {
                movies.map((movie) => {
                    return <Col md={3} key={ movie._id }>
                        <MovieCard movie={ movie }
                        onMovieClick={() => {
                            setSelectedMovie(movie);
                        }} />
                    </Col>
                })
            }
            </Row>
        </>
    );
    
};
