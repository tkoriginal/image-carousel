import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions/actions';

class Images extends Component {
  componentDidMount() {
    this.props.fetchImages('cats');
  }

  render() {
    const postItems = this.props.images.map(image => (
      <img src={image} alt="" srcset="" />
    ));
    return (
      <div>
        <h1>Images</h1>
        {postItems}
      </div>
    );
  }
}

Images.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};
const mapStateToProps = state => ({
  images: state.app.images,
});

export default connect(
  mapStateToProps,
  { fetchImages },
)(Images);
