import { Dispatch, ReactNode } from "react"
import { History } from 'history';
import { RouteProps } from "react-router-dom";
import { TWSconstant } from "../services/constants/websocket";
import { TRootState } from "..";
import { TWebSocket } from "../services/actions/websocket";
import { Store } from "redux";
import { ThunkMiddleware } from "redux-thunk";


export type TLocation<T extends object = {}> =
{
  pathname: string,
  state: object & T,
  search: string,
  hash: string,
  key?: string | undefined,
}

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  listID: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export type TBurgerDetails = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface ICard {
  element:TIngredient
  id:string
  moveCard:(dragIndex: number, hoverIndex: number) => void
  index:number
}

export interface IDragItem {
index: number
id: string
}

export interface IFeedIngredientRow {
  img: string;
  name: string;
  price: number;
  quan: number;
}

interface IFeedPlateOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFeedPlate {
  padding: string;
  order: IFeedPlateOrder;
  price: number;
  img: Array<string>;
}

export type TIngredientsData = {
  [name: string]: {
    price: number,
    image_mobile: string,
    name: string,
  }
}

export interface IHeaderListItem {
  spanText: "Конструктор" | "Лента заказов" | "Личный кабинет" | "Лого";
  logo?: boolean;
}

export interface IIngredient {
  element: TIngredient
}

export interface IIngredientsCollection {
  type: string
}

export interface IMain {
  children: ReactNode
}

export interface IModal {
  history: History;
  children: ReactNode;
  closeOrderModal?: (arg: boolean) => void
}

export interface IModalOverLay {
  handle: (arg: boolean) => void;
  children: ReactNode;
}
export interface IProtectedRoute extends RouteProps  {
  readonly unAuthOnly: boolean,
  readonly passReset?: boolean,
}

export interface IWSDataOrders {
  _id: string;
  ingredients: [];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TWSData = {
  success: false,
  orders: IWSDataOrders[],
  total: 0,
  totalToday: 0,
}

export type TSocketMiddleware = (wsAction: {[name: string]: TWSconstant}) => ThunkMiddleware