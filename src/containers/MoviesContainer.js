/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { movies as moviesApi } from "../api/tmdbApi";
import DataPagination from "../components/DataPagination";
import MoviesList from "../components/MoviesList";
import SearchInput from "../components/SearchInput";
import useQuery from "../hooks/useQuery";

const MoviesContainer = ({ movies, fetchMovies, searchMovies, search }) => {
  const queryParams = useQuery() ?? {};
  const history = useHistory();

  const { query, page, genre } = queryParams;

  useEffect(() => {
    if (!search) {
      fetchMovies({
        page,
        genre,
      });
    } else {
      searchMovies({
        page,
        query,
      });
    }
  }, [fetchMovies, genre, page, query, search, searchMovies]);

  const handleSearch = (q) => {
    if (!q) return;
    history.push(`/movies/search?query=${q}&page=1`);
  };

  const handlePageChange = useCallback(
    (currentPage) => {
      if (search) {
        history.push(`/movies/search?query=${query}&page=${currentPage}`);
      } else {
        history.push(
          `/movies?page=${currentPage}${genre ? `&genre=${genre}` : ""}`
        );
      }
    },
    [genre, history, query, search]
  );

  return (
    <>
      <SearchInput handleOnSubmit={handleSearch} search={search} />
      <MoviesList movies={movies?.results} />
      <DataPagination
        total={movies?.total_results}
        handleOnChangePage={handlePageChange}
        search={search}
      />
    </>
  );
};

const mapStateToProps = ({ tmdb: { movies, isLoading } }) => ({
  movies,
  isLoading,
});
const mapDispatchToProps = {
  fetchMovies: moviesApi.fetch,
  searchMovies: moviesApi.search,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
