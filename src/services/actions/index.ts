import { TAppStore } from "./app";
import { TAuth } from "./auth";
import { TBurgerConstructor } from "./burger-constructor";
import { TCurrentIngredient } from "./burger-ingredients";
import { TGetFeedIngredients } from "./feed-page";
import { TForgotPassword } from "./forgot-password";

export type TApplicationActions =
  | TAuth
  | TCurrentIngredient
  | TAppStore
  | TBurgerConstructor
  | TGetFeedIngredients
  | TForgotPassword