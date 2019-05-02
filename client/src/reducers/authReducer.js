import isEmpty from "../validations/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export default authReducer;
