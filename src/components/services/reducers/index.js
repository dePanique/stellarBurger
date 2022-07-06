import { combineReducers } from "redux";
import { burgerIngredients } from "./burger-ingredients";
import { burgerConstructor } from "./burger-constructor";

export const rootReducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
})