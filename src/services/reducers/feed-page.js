import { GET_ERR, GET_FEED, SET_FEED_DATA } from "../actions/feed-page";

const initialState = {
  request: false,
  success: false,
  failed: false,
  online: false,
  orders: [],
  ingredientsData: {}
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

    case SET_FEED_DATA:
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