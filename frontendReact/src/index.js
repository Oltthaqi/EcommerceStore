import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./components/StateRedux/store";
import { BrowserRouter as BrowserRouter } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
