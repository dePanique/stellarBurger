import {
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from "../constants/burger-ingredients";
import { TCurrentIngredient } from "../actions/burger-ingredients";
import { TIngredient } from "../../utils/type";
import { hcIngredient } from "../../utils/constants";

export type TBurgerIngredientsState = {
  ingredient: TIngredient
}

const initialState: TBurgerIngredientsState = {
  ingredient: hcIngredient,
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
