import { combineReducers } from "redux";
import authReducer from "../reducers/authAction";


const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
