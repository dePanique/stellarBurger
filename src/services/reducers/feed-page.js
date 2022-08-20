import { GET_ERR, GET_FEED } from "../actions/feed-page";

const initialState = {
  request: false,
  success: false,
  failed: false,
  online: false,
  orders: [],
}

export const feedPage = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return  {
        ...state,
        failed: false,
        request: false,
        success: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    case GET_ERR:
      return {
        ...state,
        request: false,
        failed: true,
      }

    default:
      return state;
  }
}