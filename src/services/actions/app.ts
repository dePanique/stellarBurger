import { getData, checkResponse } from '../../utils/utils';
import { GET_FEED_INGREDIENTS } from './feed-page';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants/app';
import { AppThunk, TAppDispatch } from '../..';
import { TIngredient } from '../../utils/type';

export interface IGetIngredients  {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess  {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: TIngredient[];
}

export interface IGetIngredientsFailed  {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TAppStore =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsFailed

export const appStoreGetIngredients = (): IGetIngredients => ({
  type: GET_INGREDIENTS
})

export const appStoreGetIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  data: ingredients,
})

export const appStoreGetIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
})

export const getIngredients: AppThunk = () => {

  return function(dispatch: TAppDispatch) {
    dispatch(appStoreGetIngredients());

    getData()
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`ошибка в ответе сервера в getIngredients ${err}`);
      })
      .then((res: {data: TIngredient[]}) => {
        dispatch(appStoreGetIngredientsSuccess(res.data));

        res.data.forEach((_, index) => {
          dispatch({
            type: GET_FEED_INGREDIENTS,
            payload: {
              _id: res.data[index]._id,
              price: res.data[index].price,
              image_mobile: res.data[index].image_mobile,
              name: res.data[index].name,
            }
          })
        })
      })
      .catch((err) => {
        dispatch(appStoreGetIngredientsFailed());
        console.log(
          `ошибка после GET_INGREDIENTS_FAILED в getIngredients ${err}`
        );
      });
  };
}
