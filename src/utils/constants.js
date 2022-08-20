import PropTypes from "prop-types";

import {
  socketMiddleware
} from "../services/middleware/socketMiddleware";

import {
  WS_FEED_START,
  WS_FEED_SUCCESS,
  WS_FEED_MESSAGE,
  WS_FEED_SEND,
  WS_FEED_CLOSED,
  WS_FEED_FAILED,
 } from "../services/actions/feed-page";

import {
  WS_PROFILE_ORDERS_START,
  WS_PROFILE_ORDERS_SUCCESS,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_SEND,
  WS_PROFILE_ORDERS_CLOSED,
  WS_PROFILE_ORDERS_FAILED,
} from "../services/actions/profile-orders";

const feedPageWS = {
  socketInit: WS_FEED_START,
  onOpen: WS_FEED_SUCCESS,
  onMessage: WS_FEED_MESSAGE,
  sendMessage: WS_FEED_SEND,
  onClose: WS_FEED_CLOSED,
  onError: WS_FEED_FAILED,
}

const profileOrderPageWS = {
  socketInit: WS_PROFILE_ORDERS_START,
  onOpen: WS_PROFILE_ORDERS_SUCCESS,
  onMessage: WS_PROFILE_ORDERS_MESSAGE,
  sendMessage: WS_PROFILE_ORDERS_SEND,
  onClose: WS_PROFILE_ORDERS_CLOSED,
  onError: WS_PROFILE_ORDERS_FAILED,
}

const wsActions = {
  feedPageWS,
  // profileOrderPageWS
};
const feedWSS ='wss://norma.nomoreparties.space/orders/all';
const myMiddleWare = socketMiddleware(feedWSS, wsActions)

const burgerStatusObj = {
  done: 'Выполнен',
  pending: 'Отменён',
  created: 'Готовится',
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
