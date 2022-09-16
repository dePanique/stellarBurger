import { TAppStore } from "./app";
import { TAuth } from "./auth";
import { TBurgerConstructor } from "./burger-constructor";
import { TCurrentIngredient } from "./burger-ingredients";
import { TGetFeedIngredients } from "./feed-page";
import { TForgotPassword } from "./forgot-password";
import { TLogIn } from "./login-page";
import { TGetOrder } from "./order-details";
import { TProfileOrders } from "./profile-orders";
import { TProfilePage } from "./profile-page";
import { TRegisterPage } from "./register-page";
import { TResetPass } from './reset-password'

export type TApplicationActions =
  | TAuth
  | TCurrentIngredient
  | TAppStore
  | TBurgerConstructor
  | TGetFeedIngredients
  | TForgotPassword
  | TLogIn
  | TGetOrder
  | TProfileOrders
  | TProfilePage
  | TRegisterPage
  | TResetPass