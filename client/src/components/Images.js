import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions/actions';

class Images extends Component {
  componentDidMount() {
    this.props.fetchImages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.Images.unshift(nextProps.newPost);
    }
  }
  render() {
    const postItems = this.props.Images.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Post</h1>
        {postItems}
      </div>
    );
  }
}

Images.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  Images: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};
const mapStateToProps = state => ({
  Images: state.Images.items,
  newPost: state.Images.item,
});

export default connect(
  mapStateToProps,
  { fetchImages },
)(Images);
