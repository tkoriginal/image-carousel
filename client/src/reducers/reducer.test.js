import reducer, { initialState } from './reducer';

describe('Reducer Test', () => {
  it('No matching action should return initial state', () => {
    const action = { type: 'NO_MATCHING_ACTION' };
    const actual = reducer(undefined, action);
    const expected = initialState;
    expect(actual).toEqual(expected);
  });
  it('FETCH_IMAGES_REQUEST should return expected output', () => {
    const action = { type: 'FETCH_IMAGES_REQUEST' };
    const actual = reducer(initialState, action);
    const expected = { ...initialState, isLoading: true };
    expect(actual).toEqual(expected);
  });
  it('FETCH_IMAGES_SUCSESS should return expected output', () => {
    const action = { type: 'FETCH_IMAGES_SUCCESS', payload: [1, 2, 3] };
    const actual = reducer(initialState, action);
    const expected = { ...initialState, isLoading: false, images: [1, 2, 3] };
    expect(actual).toEqual(expected);
    expect(actual.images).toEqual(expected.images);
  });
  it('FETCH_IMAGES_FAILURE should return expected output', () => {
    const action = { type: 'FETCH_IMAGES_FAILURE' };
    const actual = reducer(initialState, action);
    const expected = { ...initialState, isLoading: false };
    expect(actual).toEqual(expected);
  });
});
