export const socketMiddleware = (wsActions) => {
  let socket = null

  return (store) => {

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const {
        socketInit,
        onOpen,
        onMessage,
        onClose,
        onError,
        closeWS,
      } = wsActions;

      if (type === socketInit) {

        const { wsUrl, query } = payload;
        const url = wsUrl + query;

        if (socket?.url === url) return next(action);

        socket = new WebSocket(url);
      }

      if (socket) {

        socket.onopen = event => {
          dispatch({
            type: onOpen
          })
        };

        socket.onmessage = event => {
          dispatch({
            type: onMessage,
            payload: JSON.parse(event.data)
          })
        };

        socket.onclose = event => {
          dispatch({
            type: onClose,
            payload: event.code
          })

          socket = null
        };

        socket.onerror = event => {
          dispatch({
            type: onError,
            payload: event.type
          });

          socket = null
        };

        if (type === closeWS) {
          socket.close()
          socket = null
        }
      }

      next(action);
    };
  };
};
