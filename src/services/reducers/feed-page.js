import { GET_FEED } from "../actions/feed-page";

const initialState = {
  request: false,
  success: false,
  failed: false,
  online: false,
  data: []
}

export const feedPage = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return  {
        ...state,
        request: true,
      }

    default:
      return state;
  }
}