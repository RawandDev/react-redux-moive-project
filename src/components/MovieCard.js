/* eslint-disable react/prop-types */
import { StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import { posterBaseUrl } from "../api/tmdbApi/apiInfo";
import ImageContainer from "./ImageContainer";

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

const MovieCard = ({ isLarge, movie }) => (
  <Card
    hoverable
    style={{ width: "80%", margin: "20px auto" }}
    cover={
      <Link to={`/movies/${movie.id}`}>
        <ImageContainer
          src={`${posterBaseUrl}${
            isLarge ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.title}
          width="100%"
          SkeletonStyle={{ width: "100%", height: isLarge ? 455 : 165 }}
        />
      </Link>
    }
  >
    <Meta title={movie.title} avatar={<Rating rating={movie.vote_average} />} />
  </Card>
);

export default MovieCard;
