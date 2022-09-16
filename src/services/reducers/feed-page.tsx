import { TIngredientsData } from "../../utils/type";
import { TGetFeedIngredients } from "../actions/feed-page";
import {
  GET_FEED_INGREDIENTS,
} from "../constants/feed-page";

export type TFeedPageState = {
  ingredientsData: TIngredientsData
}

const initialState: TFeedPageState = {
  ingredientsData: {}
}

export const feedPage = (state = initialState, action: TGetFeedIngredients): TFeedPageState => {
  switch (action.type) {
    case GET_FEED_INGREDIENTS:
      return {
        ingredientsData: {
          ...state.ingredientsData,
          [`${action.payload._id}`]: {
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