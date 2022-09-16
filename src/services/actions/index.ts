import { TAppStore } from "./app";
import { TAuth } from "./auth";
import { TBurgerConstructor } from "./burger-constructor";
import { TCurrentIngredient } from "./burger-ingredients";

export type TApplicationActions =
  | TAuth
  | TCurrentIngredient
  | TAppStore
  | TBurgerConstructor