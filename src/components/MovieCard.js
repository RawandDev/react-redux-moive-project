/* eslint-disable react/prop-types */
import { StarFilled } from "@ant-design/icons";
import { Card, Skeleton, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const posterBaseUrl = "https://image.tmdb.org/t/p/original";

const Rating = ({ rating }) => (
  <div style={{ position: "relative" }}>
    <StarFilled style={{ fontSize: 35, color: "#fc0" }} />
    <span
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        lineHeight: "35px",
        fontSize: 11,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      {rating}
    </span>
  </div>
);

const MovieCard = ({ isLarge, movie }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  function handleImgLoaded() {
    setImgLoaded(true);
  }

  const noImg = isLarge ? !movie.poster_path : !movie.backdrop_path;
  return (
    <Card
      hoverable
      style={{ width: "80%", margin: "20px auto" }}
      cover={
        <Link to={`/movies/${movie.id}`}>
          {(!imgLoaded || noImg) && (
            <Spin spinning={!noImg}>
              <Skeleton.Image
                style={{ width: "100%", height: isLarge ? 455 : 165 }}
              />
            </Spin>
          )}
          <img
            alt={movie.title}
            src={`${posterBaseUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            onLoad={handleImgLoaded}
            width="100%"
            style={{
              display: imgLoaded ? "block" : "none",
            }}
          />
        </Link>
      }
    >
      <Meta
        title={movie.title}
        avatar={<Rating rating={movie.vote_average} />}
      />
    </Card>
  );
};

export default MovieCard;
