import { TIngredient } from "../../utils/type";
import { TAppStore } from "../actions/app";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants/app";

export type TAppStoreInitialState = {
  request: boolean;
  failed: boolean;
  data: TIngredient[];
  success: boolean;
}

const initialState: TAppStoreInitialState = {
  request: false,
  failed: false,
  data: [],
  success: false,
};

export const appStore = (state = initialState, action: TAppStore): TAppStoreInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...initialState,
        request: true,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...initialState,
        data: action.data,
        success: true,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...initialState,
        failed: true,
      };

    default:
      return state;
  }
};
