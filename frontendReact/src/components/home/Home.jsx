import React, { useEffect, useState } from "react";
import "./Home.css";
import CarouselHomePage from "./carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "../footer/footer.jsx";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7196/api/Product");

      const ratedProducts = res.data.filter(
        (product) => product.rating === 5 && product.available === "yes"
      );
      const selectedProducts = ratedProducts.slice(0, 3);
      setProducts(selectedProducts);
    } catch (err) {
      toast.error("Couldn't load products");
      return;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <MDBIcon
              key={`full-${index}`}
              fas
              icon="star"
              className="text-warning"
            />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <MDBIcon
              key={`empty-${index}`}
              far
              icon="star"
              className="text-warning"
            />
          ))}
      </>
    );
  };
  return (
    <div className="home-content">
      <Navbar />
      <CarouselHomePage />
      <div className="productsOfTheWeek">
        {products.length > 0 ? (
          <MDBContainer fluid className="my-5">
            <MDBRow>
              {products.map((product) => (
                <MDBCol
                  key={product.id}
                  md="12"
                  lg="4"
                  className="mb-4 mb-lg-0"
                >
                  <MDBCard>
                    <div className="d-flex justify-content-between p-3">
                      <p className="lead mb-0">{product.name}</p>
                    </div>
                    <MDBCardImage
                      src={`data:image/jpeg;base64,${product.img}`}
                      position="top"
                      alt={product.name}
                    />
                    {product.priceDiscount == null ? (
                      <MDBCardBody>
                        <div className="d-flex justify-content-between">
                          <p className="small">
                            <a href="#!" className="text-muted">
                              {product.category}
                            </a>
                          </p>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0">{product.name}</h5>
                          <h5 className="text-dark mb-0">${product.price}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <p className="text-muted mb-0">
                            Available:{" "}
                            <span className="fw-bold">{product.available}</span>
                          </p>
                          <div className="ms-auto text-warning">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                      </MDBCardBody>
                    ) : (
                      <MDBCardBody>
                        <div className="d-flex justify-content-between">
                          <p className="small">
                            <a href="#!" className="text-muted">
                              {product.category}
                            </a>
                          </p>
                          <p className="small text-danger">
                            <s>${product.price}</s>
                          </p>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0">{product.name}</h5>
                          <h5 className="text-dark mb-0">
                            ${product.priceDiscount}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <p className="text-muted mb-0">
                            Available:{" "}
                            <span className="fw-bold">{product.available}</span>
                          </p>
                          <div className="ms-auto text-warning">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                      </MDBCardBody>
                    )}
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        ) : (
          <p>No products available</p>
        )}
        <Link to="/Products">
          {" "}
          <button className="seeMore">see more</button>
        </Link>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
