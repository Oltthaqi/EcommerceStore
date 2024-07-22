import React, { useEffect, useState } from "react";
import "./Home.css";
import CarouselHomePage from "./carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "../footer/footer.jsx";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);

  function getDailySeed() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year * 10000 + month * 100 + day;
  }

  function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function getRandomDailyIndices(arrayLength, count) {
    const seed = getDailySeed();
    const uniqueIndices = new Set();

    while (uniqueIndices.size < count) {
      const randomValue = seededRandom(seed + uniqueIndices.size);
      uniqueIndices.add(Math.floor(randomValue * arrayLength));
    }

    return Array.from(uniqueIndices);
  }

  const getProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7196/api/Product");
      const randomIndices = getRandomDailyIndices(res.data.length, 4);
      const selectedProducts = randomIndices.map((index) => res.data[index]);
      setProducts(selectedProducts);
    } catch (err) {
      toast.error("Couldn't load products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home-content">
      <CarouselHomePage />
      <div className="productsOfTheWeek">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${product.imgbase64}`}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: {product.price}€</Card.Text>
                <Button variant="primary">Order now</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No products available</p>
        )}
        <button className="seeMore">see more!</button>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
