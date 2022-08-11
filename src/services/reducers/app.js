import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/app";

const initialState = {
  request: false,
  failed: false,
  data: [0],
  success: false,
};

export const appStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        request: true,
        failed: false,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        data: action.payload.data,
        success: action.payload.success,
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
