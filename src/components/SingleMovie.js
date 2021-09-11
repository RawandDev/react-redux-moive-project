/* eslint-disable react/prop-types */
import { StarFilled } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import React from "react";
import { posterBaseUrl } from "../api/tmdbApi/apiInfo";
import ActorCarousel from "./ActorCarousel";
import ImageContainer from "./ImageContainer";
import MovieCarousel from "./MovieCarousel";

const SingleMovie = ({ data }) => {
  let type;

  if (data?.vote_average < 6) {
    type = "danger";
  } else if (type < 8) {
    type = "warning";
  } else {
    type = "success";
  }

  let trailerUrl = null;
  const trailerKey =
    data?.videos?.results?.[
      data?.videos?.results?.findIndex?.((video) => video.site === "YouTube")
    ]?.key;

  if (trailerKey) {
    trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
  }
  return (
    <>
      <Row justify="center" gutter={16}>
        <Col xs={24} md={12} lg={6}>
          <ImageContainer
            src={
              data?.poster_path ? `${posterBaseUrl}${data?.poster_path}` : null
            }
            width="100%"
          />
        </Col>
        <Col xs={24} md={12}>
          <Space direction="vertical">
            <Typography.Title italic>{data?.title}</Typography.Title>
            <Space align="center">
              <StarFilled
                style={{
                  color: "#fc0",
                  fontSize: 35,
                }}
              />
              <Typography.Title
                style={{ marginBottom: 0 }}
                level={3}
                type={type}
              >
                {data?.vote_average} out of 10
              </Typography.Title>
              <Typography.Title style={{ marginBottom: 0 }} level={3}>
                •
              </Typography.Title>
              <Typography.Text code>{data?.vote_count} votes</Typography.Text>
            </Space>
            <Typography.Title
              level={3}
              style={{ marginBottom: 0, marginTop: 10 }}
            >
              The Story
            </Typography.Title>
            <Typography.Text strong type="secondary">
              {data?.overview}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
      {trailerUrl && (
        <div
          style={{
            margin: "40px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={1}>Trailer</Typography.Title>
          <iframe
            title={`${data?.title} trailer`}
            width="90%"
            height="500"
            src={trailerUrl}
          />
        </div>
      )}
      {data?.credits?.cast?.length > 0 && (
        <ActorCarousel title="Starring" actors={data?.credits?.cast} />
      )}

      {data?.similar?.results?.length > 0 && (
        <MovieCarousel title="Similar Movies" movies={data?.similar?.results} />
      )}
    </>
  );
};

export default SingleMovie;
