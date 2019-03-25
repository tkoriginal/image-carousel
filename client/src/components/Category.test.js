import { shallow } from 'enzyme';
import React from 'react';
import Category from './Category';

describe('Category test', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(
      <Category key="cats" category="cats" onClick={() => true} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
