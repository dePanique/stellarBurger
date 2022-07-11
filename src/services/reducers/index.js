import { combineReducers } from "redux";
import { appStore } from "./app";
import { burgerConstructor } from "./burger-constructor";
import { burgerIngredients } from "./burger-ingredients";
import { orderDetails } from "./order-details";

export const rootReducer = combineReducers({
  appStore,
  burgerConstructor,
  burgerIngredients,
  orderDetails,
});
