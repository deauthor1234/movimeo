const MovieCatHeading = ({ tag }) => {
  return (
    <p className="movie-category">
        <span className="white">{tag}</span>
        <span>MOVIES</span>
    </p>
  )
}

export default MovieCatHeading