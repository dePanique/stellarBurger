import {
  GET_FEED_INGREDIENTS,
} from "../actions/feed-page";

const initialState = {
  ingredientsData: {}
}

export const feedPage = (state = initialState, action) => {
  switch (action.type) {

    case GET_FEED_INGREDIENTS:
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          [`${action.payload._id}`] : {
            price: action.payload.price,
            image_mobile: action.payload.image_mobile,
            name: action.payload.name,
          }
        }
      }

    default:
      return state;
  }
}