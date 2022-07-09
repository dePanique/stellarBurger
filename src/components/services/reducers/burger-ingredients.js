import { SET_CURRENTINGREDIENT, RESET_CURRENTINGREDIENT } from "../actions/burger-ingredients";
const initialState = {
  ingredient: '',
  ingredientsStore: '',
}

export const burgerIngredients = (state={}, action) => {
  switch (action.type) {
    case SET_CURRENTINGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
      };

    case RESET_CURRENTINGREDIENT:
      return initialState;

    default:
      return state;
  }
}