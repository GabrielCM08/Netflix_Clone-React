import React from "react";
import { getMovies } from "../api";

function Row({ title, path }) {
  const [movies, setMovies] = React.useState([]);

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("FetchMovies error: ", error);
    }
  };
  return <div>Row</div>;
}

export default Row;
