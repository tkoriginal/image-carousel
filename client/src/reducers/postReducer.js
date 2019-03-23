import { FETCH_USER, FETCH_IMAGES } from '../actions/types';

const initialState = {
  user: {},
  images: [],
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case FETCH_USER:
      newState.user = action.payload;
      break;
    case FETCH_IMAGES:
      newState.images = action.payload;
      break;
    default:
      return state;
  }
  return newState;
}
