import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case FETCH_POSTS:
      newState.items = action.payload;
      break;
    case NEW_POST:
      newState.item = action.payload;
      break;
    default:
      return state;
  }
  return newState;
}
