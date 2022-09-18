import {
  socketMiddleware
} from "../services/middleware/socketMiddleware";

import {
  WS_START,
  WS_SUCCESS,
  WS_MESSAGE,
  WS_SEND,
  WS_CLOSED,
  WS_FAILED,
  CLOSE_WS,
  TWSconstant,
 } from "../services/constants/websocket";
import { TIngredient } from "./type";

export const hcIngredient: TIngredient = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '#',
  image_large: '#',
  image_mobile: '#',
  listID: '#',
  name: '#',
  price: 0,
  proteins: 0,
  type: '#',
  __v: 0,
  _id: '#',
}

const wsActions: {[name: string]: TWSconstant} = {
  socketInit: WS_START,
  onOpen: WS_SUCCESS,
  onMessage: WS_MESSAGE,
  sendMessage: WS_SEND,
  onClose: WS_CLOSED,
  onError: WS_FAILED,
  closeWS: CLOSE_WS,
};

export const WS_URL: string = 'wss://norma.nomoreparties.space/orders';
export const WS_QUERY: string = '/all'

const myMiddleWare = socketMiddleware(wsActions)

const burgerStatusObj = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
}

const portalContainer = document.querySelector("#modals");

export {
  portalContainer,
  wsActions,
  myMiddleWare,
  burgerStatusObj,
};
