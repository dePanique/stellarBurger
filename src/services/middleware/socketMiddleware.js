
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
      } = wsActions;
      //console.log(getState());

      if (type === wsInit) {
        console.log(1);
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          console.log('open', event);
          // dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log(event);

          // dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          console.log('mess', event);
          // const { data } = event;
          // const parsedData = JSON.parse(data);
          // const { success, ...restParsedData } = parsedData;

          // dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          console.log(5);

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