import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions';

class ImagesContainer extends Component {
  state = {
    category: 'cats',
    index: 0,
    categoriesChecked: ['cats'],
  };
  componentDidMount() {
    this.props.fetchImages(this.state.category);
  }

  handleCategoriesChecked = event => {
    const categoriesChecked = this.state.categoriesChecked;
    const selectedValue = event.target.value;
    if (event.target.checked) {
      categoriesChecked.push(selectedValue);
      this.setState({ categoriesChecked });
      this.handleCategoryChange();
    } else {
      let categoryIndex = categoriesChecked.indexOf(selectedValue);
      categoriesChecked.splice(categoryIndex, 1);
      this.setState(
        state => ({ categoriesChecked }),
        this.handleCategoryChange(),
      );
    }
  };
  handleCategoryChange = () => {
    const { categoriesChecked } = this.state;
    const category =
      categoriesChecked.length > 1 ? 'all' : categoriesChecked[0];
    this.setState({ category });
    if (this.state.categoriesChecked[0]) {
      this.props.fetchImages(category);
    }
  };
  handleImage = action => {
    return () => {
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
        {this.props.categories.map(category => (
          <div key={category}>
            <input
              // style={{ display: 'none' }}
              type="checkbox"
              id={category}
              value={category}
              defaultChecked={category === 'cats' ? 'checked' : null}
              onClick={this.handleCategoriesChecked.bind(this)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}

        <i className="fas fa-chevron-left" onClick={this.handleImage('prev')} />
        <i
          className="fas fa-chevron-right"
          onClick={this.handleImage('next')}
        />
        <img src={this.props.images[this.state.index]} alt="" srcSet="" />
      </div>
    );
  }
}

ImagesContainer.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  images: state.app.images,
  categories: state.app.categories,
});

export default connect(
  mapStateToProps,
  { fetchImages },
)(ImagesContainer);
