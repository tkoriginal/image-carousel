import { FETCH_USER, FETCH_IMAGES } from './types';

export const fetchUser = () => dispatch => {
  fetch('/user')
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
    .then(images => {
      console.log(images);
      dispatch({
        type: FETCH_IMAGES,
        payload: images.images,
      });
    });
};
