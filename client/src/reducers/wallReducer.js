import { GET_WALL, WALL_LOADING, CLEAR_CURRENT_WALL } from "../actions/types";

const initialState = {
  wall: null,
  walls: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WALL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WALL:
      return {
        ...state,
        wall: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_WALL:
      return {
        ...state,
        wall: null
      };
    default:
      return state;
  }
}
