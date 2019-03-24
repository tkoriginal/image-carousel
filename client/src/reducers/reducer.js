import { FETCH_USER, FETCH_IMAGES } from '../actions';

export const initialState = Object.freeze({
  user: {},
  images: [],
  categories: ['cats', 'sharks'],
  isLoading: false,
});

export default function(state = initialState, action) {
  const newState = { ...state };
  // TODO: DELETE USER
  switch (action.type) {
    case FETCH_USER:
      newState.user = action.payload;
      break;
    case `${FETCH_IMAGES}_REQUEST`:
      return { ...state, images: [], isLoading: true };
    case `${FETCH_IMAGES}_SUCCESS`:
      return { ...state, images: action.payload, isLoading: false };
    // TODO: Error handling
    case `${FETCH_IMAGES}_FAILURE`:
      return { ...state, isLoading: false };
    default:
      return state;
  }
  return newState;
}
