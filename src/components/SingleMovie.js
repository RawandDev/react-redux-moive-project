/* eslint-disable react/prop-types */
import { StarFilled } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import React from "react";
import { posterBaseUrl } from "../api/tmdbApi/apiInfo";
import ImageContainer from "./ImageContainer";

// - Display the poster of the movie and a description.
// - Display 5 of the actors that played in the movie.
// - Display a section for related movies, at least 5.
// - Display the trailer of the movie.
// - Display the director name.
// - Display the movie rating and votes count.
// - Tha ability to bookmark the movie.
// - Once you click on an actor you move to their page.

const SingleMovie = ({ movie }) => {
  let type;

  if (movie.vote_average < 6) {
    type = "danger";
  } else if (type < 8) {
    type = "warning";
  } else {
    type = "success";
  }

  return (
    <Row justify="center" gutter={16}>
      <Col xs={24} md={12} lg={6}>
        <ImageContainer
          src={`${posterBaseUrl}${movie?.poster_path}`}
          width="100%"
        />
      </Col>
      <Col xs={24} md={12}>
        <Space direction="vertical">
          <Typography.Title italic>{movie.title}</Typography.Title>
          <Space align="center">
            <StarFilled
              style={{
                color: "#fc0",
                fontSize: 35,
              }}
            />
            <Typography.Title style={{ marginBottom: 0 }} level={3} type={type}>
              {movie.vote_average} out of 10
            </Typography.Title>
            <Typography.Title style={{ marginBottom: 0 }} level={3}>
              •
            </Typography.Title>
            <Typography.Text code>{movie.vote_count} votes</Typography.Text>
          </Space>
          <Typography.Title
            level={3}
            style={{ marginBottom: 0, marginTop: 10 }}
          >
            The Story
          </Typography.Title>
          <Typography.Text strong type="secondary">
            {movie.overview}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};

export default SingleMovie;
