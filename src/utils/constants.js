import PropTypes from "prop-types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../services/middleware/wsActionTypes";
import { GET_FEED, GET_ERR } from "../services/actions/feed-page";
import { socketMiddleware } from "../services/middleware/socketMiddleware";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
  getFeed: GET_FEED,
  getErr: GET_ERR,
};

const portalContainer = document.querySelector("#modals");
const feedWSS ='wss://norma.nomoreparties.space/orders/all';
const myMiddleWare = socketMiddleware(feedWSS, wsActions)

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

export { dataTemplate, portalContainer, dataTemplateObject, wsActions, myMiddleWare };
