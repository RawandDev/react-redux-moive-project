/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import "../components/Row.css";
import { connect } from "react-redux";
import MovieCarousel from "../components/MovieCarousel";
import { movies as moviesApi } from "../api/tmdbApi";

function HomeContainer({
  popularMovies,
  trendingMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
}) {
  useEffect(() => {
    fetchPopularMovies();
    fetchTrendingMovies();
  }, [fetchPopularMovies, fetchTrendingMovies]);
  return (
    <>
      <MovieCarousel movies={popularMovies} title="Most Popular" />
      <MovieCarousel movies={trendingMovies} title="Most Trending" />
    </>
  );
}

const mapStateToProps = ({ tmdb: { popularMovies, trendingMovies } }) => ({
  popularMovies,
  trendingMovies,
});

const mapDispatchToProps = {
  fetchTrendingMovies: moviesApi.fetchTrending,
  fetchPopularMovies: moviesApi.fetchPopular,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
