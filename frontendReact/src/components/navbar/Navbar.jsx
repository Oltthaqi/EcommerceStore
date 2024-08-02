import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import prfimg from "../../assets/prfplaceholder.png";
import Dropdown from "react-bootstrap/Dropdown";
import addtoCard from "../../assets/card.png";

const Navbar = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedIn(true);
      setUsername(
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ]
      );
    }
  }, []);

  const getuserandimg = async () => {
    try {
      const res = await axios.get("https://localhost:7196/api/User/Username", {
        params: {
          Username: username,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setImage(res.data.profileimgBase64);
      }
    } catch (err) {
      toast.error("Error while getting profile image!");
    }
  };

  useEffect(() => {
    if (username) {
      getuserandimg();
    }
  }, [username]);

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
            <span className="navtext">Welcome back, {username}!</span>
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
                    <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
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
