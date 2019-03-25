import { shallow } from 'enzyme';
import React from 'react';
import Image from './Image';

describe('Image test', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(<Image image="http://www.google.com/" />);
    expect(wrapper).toMatchSnapshot();
  });
});
