import React, { useEffect } from "react";
import "./Row.css";
import { getMovies } from "../api";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

const imageHost = "https://image.tmdb.org/t/p/original/";
function Row({ title, path, isLarge }) {
  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");

  const handleOnClick = (movie) => {
    //pegar url do trailer
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.title || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Erro fetching movie trailer: ", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("FetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={`movie-cards ${isLarge && "movie-cards-large"}`}
              onClick={() => handleOnClick(movie)}
              key={movie.id}
              src={`${imageHost}${
                isLarge ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            ></img>
          );
        })}
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
}

export default Row;
