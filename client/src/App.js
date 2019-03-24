import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import './css/app.css';

import ImageCarousel from './components/ImageCarousel';
import store from './store';

const MainContent = styled.main`
  width: 900px;
  margin: 7em auto;
`;

export default function App() {
  return (
    <Provider store={store}>
      <MainContent>
        <ImageCarousel />
      </MainContent>
    </Provider>
  );
}
