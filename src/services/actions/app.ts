import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants/app';
import { AppThunk } from '../..';
import { TIngredient, TResponseIngredients } from '../../utils/type';
import { checkResponses, getDatas } from '../../utils/apiUtils';
import { getFeedIngredient } from './feed-page';

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: TIngredient[];
}

export interface IGetIngredientsFailed {
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
  return async function (dispatch) {

    dispatch(appStoreGetIngredients());

    try {
      const res: TResponseIngredients = await getDatas().then((res) => checkResponses(res));

      dispatch(appStoreGetIngredientsSuccess(res.data));

      res.data.forEach((_, index) => {
        dispatch(getFeedIngredient({
          _id: res.data[index]._id,
          price: res.data[index].price,
          image_mobile: res.data[index].image_mobile,
          name: res.data[index].name,
        }));
      });

    } catch (err) {
      dispatch(appStoreGetIngredientsFailed());
      console.log(
        `ошибка после GET_INGREDIENTS_FAILED в getIngredients ${err}`
      );
    }
  };
}
