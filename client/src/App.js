import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import User from './components/User';
import ImageCarousel from './components/ImageCarousel';
import store from './store';

const MainContent = styled.main`
  width: 80%;
  margin: 7em auto;
`;

export default function App() {
  return (
    <Provider store={store}>
      <MainContent>
        <User />
        <ImageCarousel />
      </MainContent>
    </Provider>
  );
}
