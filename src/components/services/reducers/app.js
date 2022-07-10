import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/app";

const initialState = {
  request: false,
  failed: false,
  data: [0],
};

export const appStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        request: true,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        data: action.payload,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        request: false,
        failed: true,
      };

    default:
      return state;
  }
};
