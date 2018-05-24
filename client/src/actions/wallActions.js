import axios from "axios";

import {
  GET_WALL,
  WALL_LOADING,
  CLEAR_CURRENT_WALL,
  // SET_CURRENT_WALL,
  GET_ERRORS
} from "./types";

// Get current wall
export const getCurrentWall = () => dispatch => {
  dispatch(setWallLoading());
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: GET_WALL,
        payload: res.data
      });
      // dispatch(setCurrentWall(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_WALL,
        payload: {}
      })
    );
};

// Set logged in user
// export const setCurrentWall = decoded => {
//   // Dispatch to reducer
//   return {
//     type: SET_CURRENT_WALL,
//     payload: decoded
//   };
// };

// Wall loading
export const setWallLoading = () => {
  return {
    type: WALL_LOADING
  };
};

// Clear Wall
export const clearCurrentWall = () => {
  return {
    type: CLEAR_CURRENT_WALL
  };
};
