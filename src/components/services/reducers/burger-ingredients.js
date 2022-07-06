import { SET_BURGERINGREDIENTS } from '../actions/burger-ingredients';

export const burgerIngredientsData = (state = {}, action) => {
  switch (action.payload) {
    case SET_BURGERINGREDIENTS:
      return state;
    default:
      return state;
  }
}

export const currentConstructorIngredient = (state = {}, action) => {
  switch (action.payload) {
    case SET_BURGERINGREDIENTS:
      return state;
    default:
      return state;
  }
}

export const currentViewingIngredient = (state = {}, action) => {
  switch (action.payload) {
    case SET_BURGERINGREDIENTS:
      return state;
    default:
      return state;
  }
}

export const completedOrder = (state = {}, action) => {
  switch (action.payload) {
    case SET_BURGERINGREDIENTS:
      return state;
    default:
      return state;
  }
}