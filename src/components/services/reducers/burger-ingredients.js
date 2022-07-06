import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/burger-ingredients';

const initialState = {
  request: false,
  failed: false,
  data: [],
}

export const burgerIngredients = (state = initialState, action) => {
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
}

// export const currentConstructorIngredient = (state = {}, action) => {
//   switch (action.payload) {
//     case SET_BURGERINGREDIENTS:
//       return state;
//     default:
//       return state;
//   }
// }

// export const currentViewingIngredient = (state = {}, action) => {
//   switch (action.payload) {
//     case SET_BURGERINGREDIENTS:
//       return state;
//     default:
//       return state;
//   }
// }

// export const completedOrder = (state = {}, action) => {
//   switch (action.payload) {
//     case SET_BURGERINGREDIENTS:
//       return state;
//     default:
//       return state;
//   }
// }