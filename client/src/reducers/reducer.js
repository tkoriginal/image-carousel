import { FETCH_IMAGES } from '../actions';

export const initialState = Object.freeze({
  user: {},
  images: [],
  categories: ['cats', 'sharks'],
  isLoading: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
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
}
