// store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer"; // Adjust the import path as needed

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
