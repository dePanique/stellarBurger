import { createSocket } from "../../utils/utils";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {

    return (next) => (action) => {
      // const { dispatch, getState } = store;
      // const { type, payload } = action;
      const { feedPageWS, profileOrderPageWS } = wsActions;

      createSocket(feedPageWS, wsUrl, store, action);

      next(action);
    };
  };
};
