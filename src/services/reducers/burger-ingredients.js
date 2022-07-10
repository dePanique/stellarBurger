import {
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from "../actions/burger-ingredients";

export const burgerIngredients = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
      };

    case RESET_CURRENT_INGREDIENT:
      return {
        ...state,
        ingredient: {},
      }

    default:
      return state;
  }
};
