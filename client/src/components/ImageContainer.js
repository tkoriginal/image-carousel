import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions/actions';

class ImagesContainer extends Component {
  state = {
    category: 'cats',
  };
  componentDidMount() {
    this.props.fetchImages(this.state.category);
  }

  handleCategory(type) {
    return e => {
      this.setState({ category: type });
    };
  }

  render() {
    const postItems = this.props.images.map(image => (
      <img src={image} alt="animal" />
    ));
    return (
      <div>
        <h1>Images</h1>
        <p onClick={this.handleCategory('cats')}>Cats</p>
        <p onClick={this.handleCategory('sharks')}>Sharks</p>
        {postItems}
      </div>
    );
  }
}

ImagesContainer.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  images: state.app.images,
});

export default connect(
  mapStateToProps,
  { fetchImages },
)(ImagesContainer);
