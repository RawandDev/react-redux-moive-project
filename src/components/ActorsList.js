import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import ActorCard from "./ActorCard";

const ActorsList = ({ actors }) => (
  <Row justify="center" gutter={16}>
    {actors.map((actor) => (
      <Col key={actor.id} xs={24} sm={12} md={8} lg={8} xl={6}>
        <ActorCard actor={actor} />
      </Col>
    ))}
  </Row>
);

ActorsList.defaultProps = {
  actors: [],
};

ActorsList.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object),
};
export default ActorsList;
