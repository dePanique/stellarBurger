import { SET_BURGERINGREDIENTS } from '../actions/burger-ingredients';

export const burgerIngredientsData = (state = {}, action) => {
  switch (action.payload) {
    case SET_BURGERINGREDIENTS:
      return state;
    default:
      return state;
  }
}