import { TAuth } from "./auth";
import { TCurrentIngredient } from "./burger-ingredients";

export type TApplicationActions =
  | TAuth
  | TCurrentIngredient