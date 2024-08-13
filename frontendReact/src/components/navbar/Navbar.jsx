import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import prfimg from "../../assets/prfplaceholder.png";
import Dropdown from "react-bootstrap/Dropdown";
import addtoCard from "../../assets/card.png";
import { logout } from "../actions/authAction";
import Admin from "../Admin/Admin";

const Navbar = () => {
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const getuserandimg = async () => {
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
        setImage(res.data.profileImgBase64);
        if (res.data.role === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (err) {
      toast.error("Error while getting profile image!");
    }
  };

  useEffect(() => {
    if (user && user.username) {
      getuserandimg();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
    setLoggedIn(false);
    navigate("/");
    toast.success("Successfully logged out");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MySite</Link>
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li>
            <Link to="/services">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        {loggedIn ? (
          <>
            {isAdmin ? (
              <>
                <span className="navtext">Welcome back, {user.username}!</span>
                <a href="/Cart" className="cardimgbtn">
                  <img src={addtoCard} alt="" className="cartimg" />
                </a>

                <div className="profile-pic">
                  <button className="profile-pic-button ">
                    <Dropdown className="profile-pic-button">
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="opcHidden"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          View your profile
                        </Dropdown.Item>
                        <Dropdown.Item href="/Admin">
                          Admin Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <img
                      src={image ? `data:image/jpeg;base64,${image}` : prfimg}
                      alt="Profile"
                      className="profile-img"
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="navtext">Welcome back, {user.username}!</span>
                <a href="/Cart" className="cardimgbtn">
                  <img src={addtoCard} alt="" className="cartimg" />
                </a>

                <div className="profile-pic">
                  <button className="profile-pic-button ">
                    <Dropdown className="profile-pic-button">
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="opcHidden"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          View your profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <img
                      src={image ? `data:image/jpeg;base64,${image}` : prfimg}
                      alt="Profile"
                      className="profile-img"
                    />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <ul className="auth-links">
            <li>
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="auth-link">
                Signup
              </Link>
            </li>
            <li></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
