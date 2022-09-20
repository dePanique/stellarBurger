import { TIngredient } from '../../utils/type';
import {
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from '../constants/burger-ingredients';

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly ingredient: TIngredient;
};

export interface IResetCurrentIngredient {
  readonly type: typeof RESET_CURRENT_INGREDIENT;
};

export type TCurrentIngredient =
  | ISetCurrentIngredient
  | IResetCurrentIngredient

export const setCurrentIngredient = (ingredient: TIngredient): ISetCurrentIngredient => ({
  type: SET_CURRENT_INGREDIENT,
  ingredient
});

export const resetCurrentIngredient = (): IResetCurrentIngredient => ({
  type: RESET_CURRENT_INGREDIENT,
});