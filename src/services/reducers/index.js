import { combineReducers } from "redux";
import { appStore } from "./app";
import { burgerConstructor } from "./burger-constructor";
import { burgerIngredients } from "./burger-ingredients";
import { orderDetails } from "./order-details";
import { signInStore } from "./profileInfo";
import { logInStore } from "./log-in";

export const rootReducer = combineReducers({
  appStore,
  burgerConstructor,
  burgerIngredients,
  orderDetails,
  signInStore,
  logInStore,
});
