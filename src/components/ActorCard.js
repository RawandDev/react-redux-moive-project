/* eslint-disable react/prop-types */
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import { posterBaseUrl } from "../api/tmdbApi/apiInfo";
import ImageContainer from "./ImageContainer";

const ActorCard = ({ actor }) => (
  <Card
    hoverable
    style={{ width: "80%", margin: "20px auto" }}
    cover={
      <Link to={`/actors/${actor.id}`}>
        <ImageContainer
          src={
            actor.profile_path ? `${posterBaseUrl}${actor.profile_path}` : null
          }
          alt={actor.name}
          width="100%"
          SkeletonStyle={{ width: "100%", height: 423 }}
        />
      </Link>
    }
  >
    <Meta title={actor.name} />
  </Card>
);

export default ActorCard;
