import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions/actions';
import Image from './Image';

class ImagesContainer extends Component {
  state = {
    category: 'all',
    index: 0,
  };
  componentDidMount() {
    this.props.fetchImages(this.state.category);
  }

  handleCategory = type => {
    return e => {
      this.props.fetchImages(type);
      this.setState({ category: type });
    };
  };

  handleImage = action => {
    return e => {
      let index = this.state.index;
      const imageCount = this.props.images.length;
      if (action === 'next') {
        index = index + 1 > imageCount - 1 ? 0 : index + 1;
      }
      if (action === 'prev') {
        index = index - 1 < 0 ? imageCount - 1 : index - 1;
      }
      this.setState({ index });
    };
  };

  render() {
    return (
      <div>
        <h1>Images</h1>
        <p>{this.state.index}</p>
        <p onClick={this.handleCategory('cats')}>Cats</p>
        <p onClick={this.handleCategory('sharks')}>Sharks</p>
        <i class="fas fa-chevron-left" onClick={this.handleImage('prev')} />
        <i class="fas fa-chevron-right" onClick={this.handleImage('next')} />
        <img src={this.props.images[this.state.index]} alt="" srcset="" />
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
