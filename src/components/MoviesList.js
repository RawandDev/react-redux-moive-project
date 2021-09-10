import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import MovieCard from "./MovieCard";

const MoviesList = ({ movies }) => (
  <Row justify="center" gutter={16}>
    {movies.map((movie) => (
      <Col key={movie.id} xs={24} sm={12} md={8} lg={8} xl={6}>
        <MovieCard movie={movie} />
      </Col>
    ))}
  </Row>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
export default MoviesList;
