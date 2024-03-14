import "./movieCard.scss"

export const MovieCard = (props) => {
    return <div className="movieCard" onClick={() => {
        props.onMovieClick();
    }} >
        <div><img src={ props.movie.imagePath } /></div>
        <div>{ props.nthMovie }: { props.movie.title }</div>
    </div>
}
