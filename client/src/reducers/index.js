import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import wallReducer from "./wallReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  wall: wallReducer
});
