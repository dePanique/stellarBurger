import { SET_BUN, CALC_FULLPRICE, SET_ORDERID  } from '../actions/burger-constructor'

const initialState = {
  data : [],
  bun: [],
  price: 0,
}
export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        data: action.payload.data,
        bun: action.payload.bun,
      };

    case CALC_FULLPRICE:
      return {
        ...state,
        finalPrice: state.data.reduce((prev, { price }) => prev + price, 0) + state.bun.price * 2,
        ingredientsId: state.data.map((el) => el._id).concat(state.bun._id),
      };

    case SET_ORDERID:
      return {
        ...state,
        orderId: action.payload,
      };

    default:
      return state;
  }
}