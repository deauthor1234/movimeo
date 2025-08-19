const MovieCatHeading = ({ tag }) => {
  return (
    <p className="movie-category" data-aos="fade-right">
        <span className="white">{tag}</span>
        <span>MOVIES</span>
    </p>
  )
}

export default MovieCatHeading