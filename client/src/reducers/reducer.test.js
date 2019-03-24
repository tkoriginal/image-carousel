import reducer, { initialState } from './reducer';

describe('Reducer Test', () => {
  it('No matching action should return initial state', () => {
    const action = { type: 'NO_MATCHING_ACTION' };
    const actual = reducer(undefined, action);
    const expected = initialState;
    expect(actual).toEqual(expected);
  });
  it('FETCH_IMAGES_REQUEST should return expected output', () => {});
  it('FETCH_IMAGES_SUCSESS should return expected output', () => {});
  it('FETCH_IMAGES_FAILURE should return expected output', () => {});
});
