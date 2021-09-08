/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { movies as moviesApi } from "../api/tmdbApi";
import Error from "../components/Error";
import SingleMovie from "../components/SingleMovie";
import { setError, setLoading } from "../store/reducers/tmdbSlice";

const SingleMovieContainer = ({
  error,
  dispatchSetLoading,
  dispatchSetError,
}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (id) {
      dispatchSetLoading(true);
      moviesApi
        .fetchSingle(id)
        .then((data) => setMovie(data))
        .catch((err) =>
          dispatchSetError(
            err.response?.status === 404
              ? "Movie not found"
              : "Something went wrong"
          )
        )
        .finally(() => dispatchSetLoading(false));
    }
  }, [dispatchSetError, dispatchSetLoading, id]);

  console.log(movie);
  return error ? <Error /> : <SingleMovie movie={movie} />;
};

const mapStateToProps = ({ tmdb: { loading, error } }) => ({ loading, error });
const mapDispatchToProps = {
  dispatchSetLoading: setLoading,
  dispatchSetError: setError,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleMovieContainer);
