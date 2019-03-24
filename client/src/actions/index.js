export const FETCH_IMAGES = 'FETCH_IMAGES';

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
