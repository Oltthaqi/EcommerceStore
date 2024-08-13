import * as React from "react";
import axios from "axios";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReorderIcon from "@mui/icons-material/Reorder";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Admin.css";
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

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7196/api/Product");
      setProducts(res.data);
    } catch (error) {
      toast.error("Error displaying products");
    }
  };
  React.useEffect(() => {
    fetchProducts();
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
    navigate("/");
    toast.success("Successfully logged out");
  };
  return (
    <div className="con">
      <List
        className="adminDash"
        sx={{ width: "100%", maxWidth: 360, background: "lightblue" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Admin Dashboard
          </ListSubheader>
        }
      >
        <ListItemButton href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton href="/Admin/Users">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton href="/Admin/Orders">
          <ListItemIcon>
            <ReorderIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout} href="/">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#ffffff" }}
      >
        <MDBContainer
          className="py-5 h-100"
          style={{ width: "1000px", padding: "0px" }}
        >
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4" style={{ width: "1000px" }}>
                  <MDBRow>
                    <MDBCol lg="7" style={{ width: "1000px" }}>
                      <MDBTypography tag="h5">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Products
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-0">You have {products.length}</p>
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
                                >
                                  <i class="fas fa-pen-to-square"></i>
                                </button>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default Admin;
