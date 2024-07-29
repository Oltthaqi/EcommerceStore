import React from "react";
import * as Components from "./Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LoginRegister() {
  const [signIn, setSignIn] = React.useState(true);
  const toggle = (value) => setSignIn(value);
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast.error("incorrect image format!");
        reject(error);
      };

      if (file instanceof Blob || file instanceof File) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error("Input is not a Blob or File object"));
        toast.error("Input is not a Blob or File object");
      }
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("Username");
    const name = formData.get("Name");
    const surname = formData.get("Surname");
    const password = formData.get("Password");
    const profileImgFile = formData.get("profileImgBase64");

    try {
      const res = await axios.get("https://localhost:7196/api/User/Username", {
        params: {
          Username: username,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        toast.error("Registration failed. Username is already taken!");
      } else {
        try {
          if (
            password.length < 8 ||
            !/\d/.test(password) ||
            !/\W/.test(password)
          ) {
            toast.error(
              "password has to be at least 8 characters long, contain number and special characters!"
            );
          } else {
            const profileimgBase64 = await convertToBase64(profileImgFile);
            const formDataToSend = new FormData();
            formDataToSend.append("Username", username);
            formDataToSend.append("Name", name);
            formDataToSend.append("Surname", surname);
            formDataToSend.append("Password", password);
            formDataToSend.append("profileImgBase64", profileimgBase64);

            const response = await axios.post(
              "https://localhost:7196/api/User/Register",
              formDataToSend,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 200) {
              toast.success("Registration successful!");
              navigate("/");
            }
          }
        } catch (error) {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        "https://localhost:7196/api/Auth/Login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        const token = response.data;

        localStorage.setItem("token", token);
        navigate("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("username or password is incorrect");
    }
  };

  return (
    <div>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="username"
              name="Username"
            />
            <Components.Input
              type="text"
              placeholder="First name"
              name="Name"
            />
            <Components.Input
              type="text"
              placeholder="Last name"
              name="Surname"
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="Password"
            />
            <Components.Input
              type="file"
              placeholder="add photo"
              name="profileImgBase64"
            />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="text"
              placeholder="username"
              name="username"
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To order please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
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
