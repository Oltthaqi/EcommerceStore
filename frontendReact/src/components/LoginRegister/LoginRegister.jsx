import React, { useState } from "react";
import * as Components from "./Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../actions/authAction";
import "./LoginRegister.css"; // Import the custom CSS

function LoginRegister() {
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await dispatch(login(username, password));
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Username or password is incorrect");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get("username"),
      name: formData.get("name"),
      surname: formData.get("surname"),
      password: formData.get("password"),
    };

    const profileImgFile = formData.get("profileImgBase64");
    if (profileImgFile) {
      try {
        const base64String = await convertToBase64(profileImgFile);
        userData.profileImgBase64 = base64String;
      } catch (error) {
        toast.error(
          "Error while converting image to Base64. Please try again."
        );
        return;
      }
    }

    console.log("User Data:", userData);

    try {
      const response = await axios.post(
        "https://localhost:7196/api/User/Register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      toast.success("Registration successful! Please sign in.");
      setSignIn(true);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Registration failed. Please try again.");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const toggle = (signInState) => {
    setSignIn(signInState);
  };

  return (
    <div className="container">
      <Components.Container className="form-container">
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title className="title">
              Create Account
            </Components.Title>
            <Components.Input
              type="text"
              placeholder="Username"
              name="username"
            />
            <Components.Input
              type="text"
              placeholder="First name"
              name="name"
            />
            <Components.Input
              type="text"
              placeholder="Last name"
              name="surname"
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
            />
            <Components.Input
              type="file"
              placeholder="Add photo"
              name="profileImgBase64"
            />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title className="title">Sign in</Components.Title>
            <Components.Input
              type="text"
              placeholder="Username"
              name="username"
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
            />
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel
              signinIn={signIn}
              className="overlay-panel"
            >
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To order please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton
                className="ghost-button"
                onClick={() => toggle(true)}
              >
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel
              signinIn={signIn}
              className="overlay-panel"
            >
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton
                className="ghost-button"
                onClick={() => toggle(false)}
              >
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
        <ToastContainer />
      </Components.Container>
    </div>
  );
}

export default LoginRegister;
