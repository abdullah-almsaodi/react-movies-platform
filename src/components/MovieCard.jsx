import React from "react";

const MovieCard = ({
  movie: { title, vote_average, release_date, original_language },
}) => {
  return <p className="text-white">{title}</p>;
};
export default MovieCard;
