import React from "react";
import PropTypes from "prop-types";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import useMediaQuery from "../hooks/useMediaQuery";
import ActorCard from "./ActorCard";

const ActorCarousel = ({ actors, title }) => {
  const isMediumScreen = useMediaQuery("(min-width: 992px)");

  return (
    <div
      style={{
        borderRadius: "2px",
        marginBottom: 30,
      }}
    >
      <Typography.Title style={{ textAlign: "center" }} level={1}>
        {title}
      </Typography.Title>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={150}
        totalSlides={actors.length}
        visibleSlides={isMediumScreen ? 4 : 1}
        className="relative"
      >
        <Slider>
          {actors.map((actor, index) => (
            <Slide key={actor.id} index={index}>
              <ActorCard actor={actor} />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="btn-back btn-carousel">
          <LeftOutlined />
        </ButtonBack>
        <ButtonNext className="btn-next btn-carousel">
          <RightOutlined />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};

ActorCarousel.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

ActorCarousel.defaultProps = {
  title: "",
};

export default ActorCarousel;
