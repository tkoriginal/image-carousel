import React, { Component } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import User from './components/User';
import ImageContainer from './components/ImageContainer';
import store from './store';

const MainContent = styled.main`
  width: 80%;
  margin: 7em auto;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContent>
          <User />
          <ImageContainer />
        </MainContent>
      </Provider>
    );
  }
}

export default App;
