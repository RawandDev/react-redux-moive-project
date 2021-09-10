/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { movies as moviesApi } from "../api/tmdbApi";
import Error from "../components/Error";
import SingleMovie from "../components/SingleMovie";

const SingleMovieContainer = ({ error, movie, fetchSingleMovie }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchSingleMovie(id);
    }
  }, [fetchSingleMovie, id]);

  console.log(movie);
  return error ? <Error /> : <SingleMovie data={movie.data} />;
};

const mapStateToProps = ({ tmdb: { singleMovie, error } }) => ({
  movie: singleMovie,
  error,
});
const mapDispatchToProps = {
  fetchSingleMovie: moviesApi.fetchSingle,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleMovieContainer);
