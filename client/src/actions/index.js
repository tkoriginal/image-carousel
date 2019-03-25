export const FETCH_IMAGES = 'FETCH_IMAGES';

//Breaking down function to allow injection during testing
const getImagesByCategory = category =>
  fetch(`/images/${category}`).then(res => res.json());

export const fetchImagesBase = fetcher => category => dispatch => {
  dispatch({
    type: `${FETCH_IMAGES}_REQUEST`,
  });
  return fetcher(category) //Only returning so test can be validated that dispatch does indeed get called twice on SUCCESS
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
