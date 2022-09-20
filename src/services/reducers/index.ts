// import { combineReducers } from "redux";
import { combineReducers } from '@reduxjs/toolkit'

import { appStore } from "./app";
import { burgerConstructor } from "./burger-constructor";
import { burgerIngredients } from "./burger-ingredients";
import { orderDetails } from "./order-details";
import { signInStore } from "./register-page";
import { logInStore } from "./login-page";
import { profilePageStore } from "./profile-page";
import { authStore } from "./auth";
import { forgotPasswordStore } from "./forgot-password";
import { resetPassStore } from "./reset-password";
import { feedPage } from "./feed-page";
import { profileOrders } from "./profile-orders";
import { websocket } from "./websocket";

export const rootReducer = combineReducers({
  appStore,
  burgerConstructor,
  burgerIngredients,
  orderDetails,
  signInStore,
  logInStore,
  profilePageStore,
  authStore,
  forgotPasswordStore,
  resetPassStore,
  feedPage,
  profileOrders,
  websocket,
});
