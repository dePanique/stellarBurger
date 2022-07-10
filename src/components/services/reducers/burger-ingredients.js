import {
  SET_CURRENTINGREDIENT,
  RESET_CURRENTINGREDIENT,
} from "../actions/burger-ingredients";

export const burgerIngredients = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENTINGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
      };

    case RESET_CURRENTINGREDIENT:
      return state;

    default:
      return state;
  }
};
