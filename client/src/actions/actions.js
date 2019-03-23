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
    .then(imagesObj => {
      console.log(imagesObj);
      dispatch({
        type: FETCH_IMAGES,
        payload: imagesObj.images,
      });
    })
    .catch(e => console.log(e));
};
