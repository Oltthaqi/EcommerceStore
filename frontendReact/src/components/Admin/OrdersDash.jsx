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
import { useDispatch } from "react-redux";
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

function OrdersDash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Orders, setOrders] = React.useState([]);
  const [userMap, setUserMap] = React.useState({});

  const fetchOrdersAndUsers = async () => {
    try {
      const ordersRes = await axios.get("https://localhost:7196/api/Order");
      const orders = ordersRes.data;

      const usersRes = await axios.get("https://localhost:7196/api/User");
      const users = usersRes.data;

      const usersData = users.reduce((acc, user) => {
        acc[user.userId] = `${user.name} ${user.surname}`;
        return acc;
      }, {});

      setOrders(orders);
      setUserMap(usersData);
    } catch (error) {
      toast.error("Error displaying Orders");
    }
  };

  React.useEffect(() => {
    fetchOrdersAndUsers();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
    navigate("/");
    toast.success("Successfully logged out");
  };

  const handleOrderDetails = (OrderId) => {
    localStorage.setItem("orderId", OrderId);
    toast.success("Order ID added to local storage");
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
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Orders
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-0">
                            You have {Orders.length} orders
                          </p>
                        </div>
                      </div>

                      {Orders.map((order) => (
                        <MDBCard className="mb-3" key={order.id}>
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {userMap[order.userId]}
                                  </MDBTypography>
                                  <p className="small mb-0">
                                    {order.orderDate}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <MDBTypography
                                    tag="h5"
                                    className="fw-small mb-0"
                                  >
                                    {order.id}
                                  </MDBTypography>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${order.totalAmount}
                                  </MDBTypography>
                                </div>
                                <button
                                  onClick={() => handleOrderDetails(order.id)}
                                  style={{
                                    color: "#cecece",
                                    border: "none",
                                    background: "white",
                                  }}
                                >
                                  <i className="fas fa-ellipsis"></i>
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

export default OrdersDash;
