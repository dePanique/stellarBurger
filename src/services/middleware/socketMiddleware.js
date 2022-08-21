import { createSocket } from "../../utils/utils";

export const socketMiddleware = (wsActions) => {
  return (store) => {

    return (next) => (action) => {
      // const { dispatch, getState } = store;
      // const { type, payload } = action;
      const { feedPageWS, profileOrderPageWS } = wsActions;

      createSocket(feedPageWS, store, action);
      createSocket(profileOrderPageWS, store, action);

      next(action);
    };
  };
};
