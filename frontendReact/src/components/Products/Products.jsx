import axios from "axios";
import React, { useState, useEffect } from "react";
import "./products.css";
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
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = ({
  category,
  onCategoryChange,
  priceRange,
  onChangePrice,
  showAvailableOnly,
  onChangeAvailability,
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagesLength, setPagesLength] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };
  let aPageslength = products.length / 9 + 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7196/api/Product");
        var productsPerPage = [];
        if (page === 1) {
          productsPerPage = response.data.slice(0, 9);
        } else {
          productsPerPage = response.data.slice(
            (page - 1) * 10,
            (page - 1) * 10 + 9
          );
        }

        setPagesLength(Math.ceil(aPageslength));
        setProducts(response.data);
        setFilteredProducts(productsPerPage);
        setError(null);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    const categoryArray = Array.isArray(category) ? category : [];
    let filtered = products;

    if (categoryArray.length > 0) {
      filtered = filtered.filter((product) =>
        categoryArray.includes(product.category)
      );
    }

    if (priceRange && priceRange.length === 2) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    if (showAvailableOnly) {
      filtered = filtered.filter((product) => product.available === "yes");
    }
    let aPagesLength = filtered.length / 9 + 1;
    setPagesLength(Math.ceil(aPagesLength));

    var productsPerPage;
    if (page === 1) {
      productsPerPage = filtered.slice(0, 9);
    } else {
      productsPerPage = filtered.slice(
        (page - 1) * 10,
        (page - 1) * 10 + filtered.length
      );
    }
    setFilteredProducts(productsPerPage);
  }, [category, priceRange, showAvailableOnly, products]);

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

  const handleAddToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="MainDiv">
      <Navbar />
      <div className="centerDiv">
        <Sidebar
          category={category}
          onCategoryChange={onCategoryChange}
          onChangePrice={onChangePrice}
          showAvailableOnly={showAvailableOnly}
          onChangeAvailability={onChangeAvailability}
        />
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
                {filteredProducts.map((p) => (
                  <MDBCol key={p.id} md="12" lg="4" className="mb-4 mb-lg-0">
                    <div className="product-card">
                      <MDBCard>
                        <div className="d-flex justify-content-between p-3">
                          <p className="lead mb-0">{p.name}</p>
                        </div>
                        <MDBCardImage
                          src={`data:image/jpeg;base64,${p.img}`}
                          position="top"
                          alt={p.name}
                        />
                        {p.priceDiscount == null ? (
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <p className="small">
                                <a href="#!" className="text-muted">
                                  {p.category}
                                </a>
                              </p>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                              <h5 className="mb-0">{p.name}</h5>
                              <h5 className="text-dark mb-0">${p.price}</h5>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                              <p className="text-muted mb-0">
                                Available:{" "}
                                <span className="fw-bold">{p.available}</span>
                              </p>
                              <div className="ms-auto text-warning">
                                {renderStars(p.rating)}
                              </div>
                            </div>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(p.id)}
                            >
                              Add to Cart
                            </button>
                          </MDBCardBody>
                        ) : (
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <p className="small">
                                <a href="#!" className="text-muted">
                                  {p.category}
                                </a>
                              </p>
                              <p className="small text-danger">
                                <s>${p.price}</s>
                              </p>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                              <h5 className="mb-0">{p.name}</h5>
                              <h5 className="text-dark mb-0">
                                ${p.priceDiscount}
                              </h5>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                              <p className="text-muted mb-0">
                                Available:{" "}
                                <span className="fw-bold">{p.available}</span>
                              </p>
                              <div className="ms-auto text-warning">
                                {renderStars(p.rating)}
                              </div>
                            </div>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(p.id)}
                            >
                              Add to Cart
                            </button>
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
      <div className="Pages">
        <Stack spacing={2}>
          <Pagination
            count={pagesLength - 1}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
      <Footer style={{ display: "block" }} />
    </div>
  );
};

export default Products;
