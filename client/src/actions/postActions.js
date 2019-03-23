import { FETCH_USER, FETCH_IMAGES } from './types';

export const fetchPosts = () => dispatch => {
  fetch('/')
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: FETCH_USER,
        payload: user,
      }),
    );
};

export const fetchImages = category => dispatch => {
  fetch(`/images/${category}`)
    .then(res => res.json())
    .then(images =>
      dispatch({
        type: FETCH_IMAGES,
        payload: images,
      }),
    );
};
