import { useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import movieList from "../../resources/movies.json";

export const MainView = () => {
    const [movies, setMovie] = useState(movieList);

    const [selectedMovie, setSelectedMovie] = useState(null);
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
                    return <MovieCard key={movie._id} nthMovie={nthMovie} movie={movie}
                            onMovieClick={() => {
                                setSelectedMovie(movie);
                            }} />
                })}
        </div>
    );
    
};
