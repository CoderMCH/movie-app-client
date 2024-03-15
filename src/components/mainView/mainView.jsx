import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { RegisterView } from "../registerView/registerView";

// const appUrl = "https://mch-flix-app-813b2fce5e48.herokuapp.com";
const appUrl = "https://mch-flix-app-813b2fce5e48.herokuapp.com"
// temp token for bypass server auth
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVmMjg4NzgxNGQzYTQzM2RiMDE4ODciLCJ1c2VybmFtZSI6Imhlcm9rdVRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRDTzg5cWFoY2p2MWcydUVwajFoOC9PN2JPZkVIVkFvNmxYdnR5NFdxZGN2V3JhNFBEMzJTbSIsImVtYWlsIjoidGVzdEBoZXJva3UuY29tIiwiZmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxMDE3MjcwNSwiZXhwIjoxNzEwNzc3NTA1LCJzdWIiOiJoZXJva3VUZXN0In0.2VEJZkz0y5rgJ3kT-k4Vzkz5eTUBRj0BrO3657fn4pc";

export const MainView = () => {
    const [user, setUser] = useState(null);
    if (!user) {
        return <>
            <LoginView url={appUrl} onLoggedIn={(userData) => {setUser(userData)}}/>
            <br></br>
            <RegisterView url={appUrl} onLoggedIn={(userData) => {setUser(userData)}}/>
        </>
    }

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch(appUrl + "/movies", {method: "GET", headers: { 'Authorization': `Bearer ${token}` }})
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
    );
    
};
