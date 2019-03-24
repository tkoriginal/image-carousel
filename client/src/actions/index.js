export const FETCH_USER = 'FETCH_USER';
export const FETCH_IMAGES = 'FETCH_IMAGES';

// TODO: DELETE USER
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

const getImagesByCategory = category =>
  fetch(`/images/${category}`).then(res => res.json());

export const fetchImagesBase = fetcher => category => dispatch => {
  dispatch({
    type: `${FETCH_IMAGES}_REQUEST`,
  });
  fetcher(category)
    .then(imagesObj => {
      dispatch({
        type: `${FETCH_IMAGES}_SUCCESS`,
        payload: imagesObj.images,
      });
    })
    .catch(() => {
      dispatch({
        type: `${FETCH_IMAGES}_FAILURE`,
      });
    });
};

export const fetchImages = fetchImagesBase(getImagesByCategory);
