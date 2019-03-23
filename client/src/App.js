import React, { Component } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import Posts from './components/Posts';
import PostForm from './components/PostForm';

import store from './store'


const Container = styled.div`
  width: 80%;
  margin: 7em auto;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          <PostForm />
          <hr />
          <Posts />
        </Container>
      </Provider>
    );
  }
}

export default App;
