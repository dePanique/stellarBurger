import { TIngredient } from '../../utils/type';
import {
  SET_BUN,
  CALC_FULLPRICE,
  SET_ORDER_ID,
  ON_BUN_DROP,
  ON_MAIN_DROP,
  DELETE_ITEM,
  REFILL_CONSTRUCTOR,
} from '../constants/burger-constructor'

export interface ISetBun {
  readonly type: typeof SET_BUN;
  bun: TIngredient;
}

export interface ICalcFullPrice {
  readonly type: typeof CALC_FULLPRICE;
}

export interface ISetOrderID {
  readonly type: typeof SET_ORDER_ID;
  orderID: number;
}

export interface IOnBunDrop {
  readonly type: typeof ON_BUN_DROP;
  bun: TIngredient;
}

export interface IOnMainDrop {
  readonly type: typeof ON_MAIN_DROP;
  data: TIngredient;
}

export interface IRefillConstructor {
  readonly type: typeof REFILL_CONSTRUCTOR;
  data: TIngredient[];
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  data: string;
}

export type TBurgerConstructor =
  | ISetBun
  | ICalcFullPrice
  | ISetOrderID
  | IOnBunDrop
  | IOnMainDrop
  | IRefillConstructor
  | IDeleteItem

export const setBun = (bun: TIngredient): ISetBun => ({
  type: SET_BUN,
  bun
})

export const calcFullPrice = (): ICalcFullPrice => ({
  type: CALC_FULLPRICE,
})

export const setOrderID = (orderID: number): ISetOrderID => ({
  type: SET_ORDER_ID,
  orderID
})

export const onBunDrop = (bun: TIngredient): IOnBunDrop => ({
  type: ON_BUN_DROP,
  bun
})

export const onMainDrop = (data: TIngredient): IOnMainDrop => ({
  type: ON_MAIN_DROP,
  data
})

export const refillConstructor = (data: TIngredient[]): IRefillConstructor => ({
  type: REFILL_CONSTRUCTOR,
  data
})

export const deleteItem = (data: string): IDeleteItem => ({
  type: DELETE_ITEM,
  data
})
