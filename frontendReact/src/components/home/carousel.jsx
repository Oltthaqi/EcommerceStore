import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./carauselImg";
import prfimg from "../../assets/fdf.webp";
function CarouselHomePage() {
  return (
    <Carousel >
      <Carousel.Item interval={1000}>
        <ExampleCarouselImage text="First slide" image={prfimg} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <ExampleCarouselImage text="Second slide" image={prfimg} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" image={prfimg} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHomePage;
