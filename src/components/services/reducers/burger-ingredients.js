import { SET_CURRENTINGREDIENT, RESET_CURRENTINGREDIENT } from "../actions/burger-ingredients";
const initialState = {
  ingredient: '',
}

export const burgerIngredients = (state={}, action) => {
  switch (action.type) {
    case SET_CURRENTINGREDIENT:
      return {
        ingredient: action.payload,
      };

    case RESET_CURRENTINGREDIENT:
      return initialState;
      
    default:
      return state;
  }
}