import { fetchImagesBase, FETCH_IMAGES } from './';

// test('', () => {});

describe('action tests', () => {
  describe('fetchImages test', () => {
    it('Should dispatch FETCH_IMAGES_REQUEST when called', () => {
      const fetcher = () => Promise.resolve({ images: [1, 2, 3] });
      // const fetcher = new Promise((resolve) => resolve({ images: [1, 2, 3] }))
      const dispatch = jest.fn();

      fetchImagesBase(fetcher)('cat')(dispatch);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `${FETCH_IMAGES}_REQUEST`,
      });

      // it('Should call API with correct category', () => {});
      // it('Should dispatch FETCH_IMAGES_FAILURE when API is rejected', () => {});
    });
    it('Should dispatch FETCH_IMAGES_SUCCESS when api is resolved', () => {
      const fetcher = () => Promise.resolve({ images: [1, 2, 3] });
      const dispatch = jest.fn();

      const actual = fetchImagesBase(fetcher)('cat')(dispatch);

      actual.then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
    });
  });
});
