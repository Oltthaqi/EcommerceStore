import React from "react";

const ExampleCarouselImage = ({ text, image }) => {
  return (
    <div
      style={{
        height: "400px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
      }}
    >
      <h3>{text}</h3>
    </div>
  );
};

export default ExampleCarouselImage;
