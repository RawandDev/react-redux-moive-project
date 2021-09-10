/* eslint-disable react/prop-types */
import { Skeleton, Spin } from "antd";
import React, { useState } from "react";

const ImageContainer = ({ src, alt, SkeletonStyle, width }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  function handleImgLoaded() {
    setImgLoaded(true);
  }
  return (
    <>
      {(!imgLoaded || !src) && (
        <Spin spinning={src}>
          <Skeleton.Image style={SkeletonStyle} />
        </Spin>
      )}
      <img
        alt={alt}
        src={src}
        onLoad={handleImgLoaded}
        width={width}
        style={{
          display: imgLoaded ? "block" : "none",
        }}
      />
    </>
  );
};

export default ImageContainer;
