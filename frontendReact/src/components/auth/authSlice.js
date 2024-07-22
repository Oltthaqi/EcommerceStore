import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

// Define a thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { dispatch }) => {
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
      const { token } = response.data;
      localStorage.setItem("token", token);
      return { userInfo: response.data.userInfo, token };
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userToken = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.error = null;
      state.success = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.error = null;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
        state.success = false;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
