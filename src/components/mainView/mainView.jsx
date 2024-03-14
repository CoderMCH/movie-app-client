import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        let url = "https://mch-flix-app-813b2fce5e48.herokuapp.com/movies";
        // temp token for bypass server auth
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVmMjg4NzgxNGQzYTQzM2RiMDE4ODciLCJ1c2VybmFtZSI6Imhlcm9rdVRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRDTzg5cWFoY2p2MWcydUVwajFoOC9PN2JPZkVIVkFvNmxYdnR5NFdxZGN2V3JhNFBEMzJTbSIsImVtYWlsIjoidGVzdEBoZXJva3UuY29tIiwiZmF2b3JpdGVNb3ZpZXMiOlsiNjVlYTdmYzA1Yzg2ZGE5NTI1OGZlZTIxIiwiNjVlYTdmYzA1Yzg2ZGE5NTI1OGZlZTIxIiwiNjVlYTdmZTU1Yzg2ZGE5NTI1OGZlZTI1IiwiNjVlYTdmZWQ1Yzg2ZGE5NTI1OGZlZTI2Il0sIl9fdiI6MCwiaWF0IjoxNzEwMjkzMzY4LCJleHAiOjE3MTA4OTgxNjgsInN1YiI6Imhlcm9rdVRlc3QifQ.ymxaWZn5UPPoiXnW3LSu5pCm6rX5SLPZAMlrQ-6g9zY";
        fetch(url, {method: "GET", headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            }).catch(err => {
                console.error(err);
            })
    }, [])

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
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
