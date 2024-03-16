import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { RegisterView } from "../registerView/registerView";

const appUrl = "https://mch-flix-app-813b2fce5e48.herokuapp.com"

export const MainView = () => {
    // user: { username: "", token: "" }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser && "username" in storedUser ? storedUser : null);
    if (!user) {
        return <>
            <LoginView url={appUrl} onLoggedIn={(userData) => {setUser(userData)}}/>
            <br></br>
            <RegisterView url={appUrl} onRegister={(err, username) => {
                if (err) {
                    alert(`Register fail\nError: ${err}`);
                } else {
                    alert(`Register success\nUsername: ${username}`);
                }
            }}/>
        </>
    }

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch(appUrl + "/movies", {method: "GET", headers: { 'Authorization': `Bearer ${user.token}` }})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            }).catch(err => {
                console.error(err);
            })
    }, [user.token])

    if (selectedMovie) {
        return <>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <hr />
            <h2>Similar movies</h2>
            <div style={ {display: "grid", gridTemplateColumns: "1fr 1fr 1fr"} }>
                {
                    movies.filter(movie => movie.title != selectedMovie.title && movie.genre.type == selectedMovie.genre.type).map(movie => {
                        return <MovieCard key={ movie._id } movie={ movie }
                                onMovieClick={() => {
                                    setSelectedMovie(movie);
                                }} />
                    })
                }
            </div>
        </>
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    
    let nthMovie = 0;
    return (
        <>
            <button onClick={() => {
                setUser(null);
                localStorage.setItem("user", null);
                }}>Logout</button>
            <div style={ {display: "grid", gridTemplateColumns: "1fr 1fr 1fr"} }>
                {
                    movies.map((movie) => {
                        nthMovie++;
                        return <MovieCard key={ movie._id } nthMovie={ nthMovie } movie={ movie }
                                onMovieClick={() => {
                                    setSelectedMovie(movie);
                                }} />
                    })}
            </div>
        </>
    );
    
};
