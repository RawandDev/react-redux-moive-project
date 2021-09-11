/* eslint-disable react/prop-types */
import { Col, Row, Space, Typography } from "antd";
import React from "react";
import { posterBaseUrl } from "../api/tmdbApi/apiInfo";
import ImageContainer from "./ImageContainer";
import MoviesList from "./MoviesList";

// - Display actor image
// - Display actor name
// - Display actor gender
// - Display actor popularity
// - Display the birth and death date if available.
// - Display the actor biography
// - Display a list of movies that the actor participated in.

const SingleActor = ({ data }) => {
  let type;

  if (data?.popularity < 20) {
    type = "danger";
  } else if (type < 40) {
    type = "warning";
  } else {
    type = "success";
  }

  return (
    <>
      <Row
        style={{ paddingBottom: "40px", borderBottom: "solid 1px #e1e1e1" }}
        justify="center"
        gutter={16}
      >
        <Col xs={24} md={12} lg={6}>
          <ImageContainer
            src={
              data?.profile_path
                ? `${posterBaseUrl}${data?.profile_path}`
                : null
            }
            width="100%"
          />
        </Col>
        <Col xs={24} md={12}>
          <Space direction="vertical">
            <Typography.Title italic>{data?.name}</Typography.Title>
            <Typography.Title level={5}>
              Born on: {data?.birthday}
            </Typography.Title>
            <Typography.Title level={5} type={type}>
              Popularity: {data?.popularity}
            </Typography.Title>

            {data?.deathday && (
              <Typography.Title level={5} type="danger">
                Passed Away on: {data?.deathday}
              </Typography.Title>
            )}
            <Typography.Title
              level={3}
              style={{ marginBottom: 0, marginTop: 10 }}
            >
              Biography
            </Typography.Title>
            <Typography.Text strong type="secondary">
              {data?.biography}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
      {data?.movie_credits?.cast?.length > 0 && (
        <>
          <Typography.Title
            style={{ textAlign: "center", margin: "50px 0" }}
            level={1}
          >
            Movies
          </Typography.Title>
          <MoviesList movies={data?.movie_credits?.cast} />
        </>
      )}
    </>
  );
};

SingleActor.defaultProps = {};

export default SingleActor;
