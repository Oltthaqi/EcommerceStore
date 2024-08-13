import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [userId, setUserId] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("https://localhost:7196/api/User/Username", {
        params: {
          Username: user.username,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setUserId(res.data.userId);
      }
    } catch (err) {
      toast.error("Error while getting profile image!");
    }
  };

  useEffect(() => {
    getUserDetails();
    const fetchCartProducts = async () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart contents:", cart);

      try {
        const fetchedProducts = await Promise.all(
          cart.map(async (productId) => {
            try {
              const response = await axios.get(
                `https://localhost:7196/api/Product/Id?id=${productId}`
              );
              return response.data;
            } catch (error) {
              console.error(
                `Error fetching product with ID ${productId}:`,
                error.response ? error.response.data : error.message
              );
              return null;
            }
          })
        );
        const validProducts = fetchedProducts.filter(
          (product) => product !== null
        );
        setProducts(validProducts);

        const totalPrice = validProducts.reduce(
          (total, product) => total + product.price,
          0
        );
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = products.filter((product) => product.id !== productId);
    setProducts(updatedCart);
    setTotalPrice(
      updatedCart.reduce((total, product) => total + product.price, 0)
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart.map((product) => product.id))
    );
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You need to be logged in to place an order");
      return;
    }

    try {
      const orderData = {
        userId: userId,
        orderDate: new Date().toISOString(),
        status: "Pending",
        totalAmount: totalPrice,
        productList: {
          productIds: products.map((product) => product.id),
        },
      };

      await axios.post("https://localhost:7196/api/Order", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("cart");
      setProducts([]);
      setTotalPrice(0);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href="/Products" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                        shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {products.length} items in your cart
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="text-muted">Sort by:</span>
                          <a href="#!" className="text-body">
                            price
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a>
                        </p>
                      </div>
                    </div>

                    {products.map((product) => (
                      <MDBCard className="mb-3" key={product.id}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <MDBCardImage
                                  src={`data:image/jpeg;base64,${product.img}`}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt="Shopping item"
                                />
                              </div>
                              <div className="ms-3">
                                <MDBTypography tag="h5">
                                  {product.name}
                                </MDBTypography>
                                <p className="small mb-0">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  1
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  ${product.price}
                                </MDBTypography>
                              </div>
                              <button
                                style={{
                                  color: "#cecece",
                                  border: "none",
                                  background: "white",
                                }}
                                onClick={() => handleRemoveFromCart(product.id)}
                              >
                                <MDBIcon fas icon="trash-alt" />
                              </button>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                        </div>

                        <p className="small">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>

                        <form className="mt-4">
                          <MDBInput
                            className="mb-4"
                            label="Cardholder's Name"
                            type="text"
                            size="lg"
                            placeholder="Cardholder's Name"
                            contrast
                          />

                          <MDBInput
                            className="mb-4"
                            label="Card Number"
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="1234 5678 9012 3457"
                            contrast
                          />

                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Expiration"
                                type="text"
                                size="lg"
                                minLength="7"
                                maxLength="7"
                                placeholder="MM/YYYY"
                                contrast
                              />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Cvv"
                                type="text"
                                size="lg"
                                minLength="3"
                                maxLength="3"
                                placeholder="&#9679;&#9679;&#9679;"
                                contrast
                              />
                            </MDBCol>
                          </MDBRow>
                        </form>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">
                            ${(totalPrice + 20).toFixed(2)}
                          </p>
                        </div>

                        <MDBBtn
                          color="info"
                          block
                          size="lg"
                          onClick={handleCheckout}
                        >
                          <div className="d-flex justify-content-between">
                            <span>${(totalPrice + 20).toFixed(2)}</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
