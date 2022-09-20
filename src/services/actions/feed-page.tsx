import {
  GET_FEED_INGREDIENTS
} from '../constants/feed-page'

type _TPayload = {
  _id: string;
  price: number;
  image_mobile: string;
  name: string;
}

export interface IGetFeedIngredients {
  readonly type: typeof GET_FEED_INGREDIENTS
  readonly payload: _TPayload
}

export type TGetFeedIngredients =
  | IGetFeedIngredients

export const getFeedIngredient = (payload: _TPayload): IGetFeedIngredients => ({
  type: GET_FEED_INGREDIENTS,
  payload
})