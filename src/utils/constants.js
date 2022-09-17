import PropTypes from "prop-types";

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
 } from "../services/constants/websocket";

export const hcIngredient = {
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

const wsActions = {
  socketInit: WS_START,
  onOpen: WS_SUCCESS,
  onMessage: WS_MESSAGE,
  sendMessage: WS_SEND,
  onClose: WS_CLOSED,
  onError: WS_FAILED,
  closeWS: CLOSE_WS,
};

export const WS_URL = 'wss://norma.nomoreparties.space/orders';
export const WS_QUERY = '/all'
export const FEED_URL = {
  wsUrl: WS_URL,
  query: '/all'
}

const myMiddleWare = socketMiddleware(wsActions)

const burgerStatusObj = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
}

const portalContainer = document.querySelector("#modals");

const dataTemplateObject = {
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};

const dataTemplate = PropTypes.shape(dataTemplateObject.isRequired);

export {
  dataTemplate,
  portalContainer,
  dataTemplateObject,
  wsActions,
  myMiddleWare,
  burgerStatusObj,
};
