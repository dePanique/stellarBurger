export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsSendMessage,
        getFeed,
        getErr
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);

      } else if (type === onClose) {
        console.log('close');
        socket.close()
        socket = null;
      }

      if (socket) {

        socket.onopen = event => {
        };

        socket.onerror = event => {
          dispatch({ type: getErr, payload: 'error' });
        };

        socket.onmessage = event => {
          //console.log('message', event);
          dispatch({ type: getFeed, payload: JSON.parse(event.data)})
        };

        socket.onclose = event => {
          socket = null
        };

        // if (type === wsSendMessage) {
        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};