import axios from "axios";
import React, { useState, useEffect } from "react";
import "./products.css";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../footer/footer";
import Sidebar from "./Sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Navbar from "../navbar/Navbar";

const Products = ({ category, onCategoryChange }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7196/api/Product");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Ensure category is an array
    const categoryArray = Array.isArray(category) ? category : [];
    if (categoryArray.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => categoryArray.includes(product.category))
      );
    }
  }, [category, products]);

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
    <div className="MainDiv">
      <Navbar />
      <div className="centerDiv">
        <Sidebar category={category} onCategoryChange={onCategoryChange} />
        <div className="cardsContainer">
          <MDBContainer fluid className="my-5">
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <MDBSpinner />
              </div>
            ) : error ? (
              <div className="d-flex justify-content-center my-5">
                <p className="text-danger">{error}</p>
              </div>
            ) : (
              <MDBRow>
                {filteredProducts.map((product) => (
                  <MDBCol
                    key={product.id}
                    md="12"
                    lg="4"
                    className="mb-4 mb-lg-0"
                  >
                    <div className="product-card">
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
                              <h5 className="text-dark mb-0">
                                ${product.price}
                              </h5>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                              <p className="text-muted mb-0">
                                Available:{" "}
                                <span className="fw-bold">
                                  {product.available}
                                </span>
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
                                <span className="fw-bold">
                                  {product.available}
                                </span>
                              </p>
                              <div className="ms-auto text-warning">
                                {renderStars(product.rating)}
                              </div>
                            </div>
                          </MDBCardBody>
                        )}
                      </MDBCard>
                    </div>
                  </MDBCol>
                ))}
              </MDBRow>
            )}
          </MDBContainer>
        </div>
      </div>
      <Footer style={{ display: "block" }} />
    </div>
  );
};

export default Products;
