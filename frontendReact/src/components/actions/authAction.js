// actions/authAction.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post("https://localhost:7196/api/Auth/Login", {
      username,
      password,
    });
    const token = response.data;
    const decodedToken = jwtDecode(token);
    const user = {
      username:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const LOGOUT = "LOGOUT";
export const logout = () => {
  localStorage.removeItem("user");
  return { type: LOGOUT };
};
