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
import MovieCard from "./MovieCard";
import useMediaQuery from "../hooks/useMediaQuery";

const MovieCarousel = ({ movies, title }) => {
  const isMediumScreen = useMediaQuery("(min-width: 992px)");

  return (
    <div
      style={{
        background: "white",
        borderRadius: "2px",
        marginBottom: 30,
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          padding: "20px 0",
        }}
      >
        {title}
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={movies.length}
        visibleSlides={isMediumScreen ? 4 : 1}
        className="relative"
      >
        <Slider>
          {movies.map((movie, index) => (
            <Slide key={movies.id} index={index}>
              <MovieCard movie={movie} />
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

MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieCarousel;
