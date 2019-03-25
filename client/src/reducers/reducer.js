import { FETCH_IMAGES } from '../actions';

export const initialState = {
  user: {},
  images: [],
  categories: ['cats', 'sharks'],
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_IMAGES}_REQUEST`: //Handles the loading state
      return { ...state, images: [], isLoading: true };
    case `${FETCH_IMAGES}_SUCCESS`:
      return { ...state, images: action.payload, isLoading: false };
    // TODO: Error handling - Unable to complete at this time
    case `${FETCH_IMAGES}_FAILURE`:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
