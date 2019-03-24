import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchImages } from '../actions';
import Image from './Image';

class ImagesContainer extends Component {
  state = {
    categoryToDisplay: 'cats',
    index: 0,
    categoriesChecked: ['cats'],
  };
  componentDidMount() {
    this.props.fetchImages(this.state.categoryToDisplay);
    document.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
        this.handleIndex('next');
        break;
      case 'ArrowLeft':
        this.handleIndex('prev');
        break;
      default:
        break;
    }
  };
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
    const categoryToDisplay =
      categoriesChecked.length > 1 ? 'all' : categoriesChecked[0];
    this.setState({ categoryToDisplay });
    if (this.state.categoriesChecked[0]) {
      this.props.fetchImages(categoryToDisplay);
    }
  };
  handleKeyPress = e => {
    console.log(e.key);
  };
  handleClick = action => {
    return () => {
      this.handleIndex(action);
    };
  };

  handleIndex = action => {
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

  render() {
    return (
      <div>
        <h1>Images</h1>
        {this.props.categories.map(categoryToDisplay => (
          <div key={categoryToDisplay}>
            <input
              // style={{ display: 'none' }}
              type="checkbox"
              id={categoryToDisplay}
              value={categoryToDisplay}
              defaultChecked={categoryToDisplay === 'cats' ? 'checked' : null}
              onClick={this.handleCategoriesChecked.bind(this)}
            />
            <label htmlFor={categoryToDisplay}>{categoryToDisplay}</label>
          </div>
        ))}

        <i className="fas fa-chevron-left" onClick={this.handleClick('prev')} />
        <i
          className="fas fa-chevron-right"
          onClick={this.handleClick('next')}
        />
        <Image image={this.props.images[this.state.index]} />
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
