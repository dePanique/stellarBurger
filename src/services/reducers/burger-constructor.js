import {
  SET_BUN,
  CALC_FULLPRICE,
  SET_ORDERID,
  ONBUNDROP,
  ONMAINDROP,
  DELETE_ITEM,
  REFILL_CONSTRUCTOR,
} from "../actions/burger-constructor";

const initialState = {
  data: [],
  bun: {
    price: 0
  },
  price: "",
  orderId: "",
  ingredientsId: [],
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        bun: action.payload.bun,
      };

    case CALC_FULLPRICE:
      return {
        ...state,
        finalPrice:
          state.data.reduce((prev, { price }) => prev + price, 0) +
          state.bun.price * 2,
        ingredientsId: state.data
          .map((el) => el._id)
          .concat([state.bun._id, state.bun._id]),
      };

    case SET_ORDERID:
      return {
        ...state,
        orderId: action.payload,
      };

    case ONBUNDROP: {
      return {
        ...state,
        bun: action.payload,
      };
    }

    case ONMAINDROP: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }

    case REFILL_CONSTRUCTOR: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        ingredientsId: [...state.ingredientsId],
        data: [...state.data.filter((el) => el.listId !== action.payload)],
      };
    }

    default:
      return state;
  }
};
