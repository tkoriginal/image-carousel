import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import { fetchImages } from '../actions';
import Image from './Image';
import Chevron from './Chevron';
import Category from './Category';

const ImageContainer = styled.div`
  width: 600px;
  height: 520px;
  overflow: hidden;
`;
class ImagesCarousel extends Component {
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

  isNotFirstImage = () => {
    return this.state.index > 0;
  };
  isNotLastImage = () => {
    return this.state.index < this.props.images.length - 1;
  };
  render() {
    return (
      <div>
        {this.props.categories.map(category => (
          <Category
            key={category}
            category={category}
            onClick={this.handleCategoriesChecked.bind(this)}
          />
        ))}
        {this.isNotFirstImage() && (
          <Chevron direction="left" onClick={this.handleClick('prev')} />
        )}
        {this.isNotLastImage() && (
          <Chevron direction="right" onClick={this.handleClick('next')} />
        )}
        {this.props.isLoading ? (
          <ReactLoading
            type="spinningBubbles"
            color="#000"
            height="100px"
            width="100px"
          />
        ) : (
          <ImageContainer>
            {/* <Image image={this.props.images[this.state.index]} /> */}
            {this.isNotFirstImage() && (
              <Image image={this.props.images[this.state.index - 1]} />
            )}
            <Image image={this.props.images[this.state.index]} />
            {this.isNotLastImage() && (
              <Image image={this.props.images[this.state.index + 1]} />
            )}
          </ImageContainer>
        )}
      </div>
    );
  }
}

ImagesCarousel.propTypes = {
  fetchImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  images: state.app.images,
  categories: state.app.categories,
  isLoading: state.app.isLoading,
});

export default connect(
  mapStateToProps,
  { fetchImages },
)(ImagesCarousel);
