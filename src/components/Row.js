import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "axios";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import MovieCard from "./MovieCard";

function Row({ title, fetchUrl, isLarge }) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  Row.propTypes = {
    title: PropTypes.string.isRequired,
    fetchUrl: PropTypes.string.isRequired,
    isLarge: PropTypes.bool.isRequired,
  };

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
  });

  useEffect(() => {
    setisLoading(true);
    async function fetchData() {
      const response = await instance.get(fetchUrl);
      setMovie(response.data.results);
      setisLoading(false);
    }

    fetchData();
    // I disabled the warning for this line. It will automatically add `instance` as dependency which causes memory leak
    // eslint-disable-next-line
  }, [fetchUrl]);

  return (
    <div className="row">
      <h1 style={{ color: "white" }}>{title}</h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="poster_path">
          {movie?.map((m) => (
            <MovieCard key={m.id} movie={m} isLarge={isLarge} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Row;
