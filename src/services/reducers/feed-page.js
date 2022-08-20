import {
  WS_FEED_START,
  WS_FEED_SUCCESS,
  WS_FEED_MESSAGE,
  WS_FEED_SEND,
  WS_FEED_CLOSED,
  WS_FEED_FAILED,
  GET_FEED_INGREDIENTS,
} from "../actions/feed-page";

const initialState = {
  request: false,
  failed: false,
  online: false,
  orders: [],
  ingredientsData: {}
}

export const feedPage = (state = initialState, action) => {
  switch (action.type) {
    case WS_FEED_START:
      return {
        ...state,
        request: true,
      }

    case WS_FEED_SUCCESS:
      return {
        ...state,
        request: false,
        online: true,
      }

    case WS_FEED_MESSAGE:
      return  {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }

    //todo
    case WS_FEED_SEND:
      return {
        ...state
      }

    case WS_FEED_CLOSED:
      return {
        ...state,
        request: false,
        failed: false,
        online: false,
      }

    case WS_FEED_FAILED:
      return {
        ...state,
        request: false,
        failed: action.payload,
        online: false,
      }

    case GET_FEED_INGREDIENTS:
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          [`${action.payload._id}`] : {
            price: action.payload.price,
            image_mobile: action.payload.image_mobile
          }
        }
      }

    default:
      return state;
  }
}