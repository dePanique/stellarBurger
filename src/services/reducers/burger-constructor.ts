import { hcIngredient } from "../../utils/constants";
import { TIngredient } from "../../utils/type";
import { TBurgerConstructor } from "../actions/burger-constructor";
import {
  SET_BUN,
  CALC_FULLPRICE,
  SET_ORDER_ID,
  ON_BUN_DROP,
  ON_MAIN_DROP,
  DELETE_ITEM,
  REFILL_CONSTRUCTOR,
} from "../constants/burger-constructor";

export interface IBurgerConstructorState {
  data: TIngredient[];
  bun: TIngredient;
  price: number;
  orderID: number;
  ingredientsID: string[];
  finalPrice: number;
}

const initialState: IBurgerConstructorState = {
  data: [],
  bun: hcIngredient,
  price: 0,
  orderID: 0,
  ingredientsID: [],
  finalPrice: 0,
};

export const burgerConstructor = (state = initialState, action: TBurgerConstructor): IBurgerConstructorState => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        bun: action.bun,
      };

    case CALC_FULLPRICE:
      return {
        ...state,
        finalPrice:
          state.data.reduce((prev, { price }) => prev + price, 0) +
          state.bun.price * 2,
        ingredientsID: state.data
          .map((el) => el._id)
          .concat([state.bun._id, state.bun._id]),
      };

    case SET_ORDER_ID:
      return {
        ...state,
        orderID: action.orderID,
      };

    case ON_BUN_DROP:
      return {
        ...state,
        bun: action.bun,
      };

    case ON_MAIN_DROP:
      return {
        ...state,
        data: [...state.data, action.data],
      };

    case REFILL_CONSTRUCTOR:
      return {
        ...state,
        data: action.data,
      };

    case DELETE_ITEM:
      return {
        ...state,
        ingredientsID: [...state.ingredientsID],
        data: [...state.data.filter((el) => el.listID !== action.data)],
      };

    default:
      return state;
  }
};
