import React, { Component } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import User from './components/User';
import ImageContainer from './components/ImageContainer';
import store from './store';

const Container = styled.div`
  width: 80%;
  margin: 7em auto;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          <User />
          <ImageContainer />
        </Container>
      </Provider>
    );
  }
}

export default App;
