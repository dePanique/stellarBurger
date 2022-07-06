import { SET_BUN } from '../actions/burger-constructor'

const initialState = {
  data : [],
  bun: []
}
export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        data: action.payload.data,
        bun: action.payload.bun,
      };

    default:
      return state;
  }
}