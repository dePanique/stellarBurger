import {
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from "../constants/burger-ingredients";
import { TCurrentIngredient } from "../actions/burger-ingredients";
import { TIngredient } from "../../utils/type";

export type TBurgerIngredientsState = {
  ingredient: TIngredient
}

const initialState: TBurgerIngredientsState = {
  ingredient: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '#',
    image_large: '#',
    image_mobile: '#',
    listId: '#',
    name: '#',
    price: 0,
    proteins: 0,
    type: '#',
    __v: 0,
    _id: '#',
  }
}

export const burgerIngredients = (state = initialState, action: TCurrentIngredient): TBurgerIngredientsState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        ingredient: action.ingredient,
      };

    case RESET_CURRENT_INGREDIENT:
      return {
        ...initialState
      }

    default:
      return state;
  }
};
