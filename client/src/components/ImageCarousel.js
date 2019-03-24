import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import { fetchImages } from '../actions';
import Image from './Image';
import Chevron from './Chevron';
import Category from './Category';

const Wrapper = styled.article`
  width: 100%;
  height: 600px;
  background: #777;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const LoadingContainer = styled.div`
  display: flex;
  justifycontent: center;
  alignitems: center;
  flex-direction: column;
  width: 600px;
  height: 520px;
`;

const CategoryContainer = styled.div`
  display: flex;
  font-size: 20px;
  position: absolute;
  z-index: 2;
  top: 30px;
  left: 50;
`;

const ChevLeft = styled.div`
  position: absolute;
  z-index: 2;
  top: 50;
  left: 15px;
  color: #444;
  font-size: 40px;
`;
const ChevRight = styled.div`
  position: absolute;
  z-index: 2;
  top: 50;
  right: 15px;
  color: #fff;
  font-size: 40px;
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

  isFirstImage = () => {
    return this.state.index < 1;
  };
  isLastImage = () => {
    return this.state.index === this.props.images.length - 1;
  };
  render() {
    return (
      <Wrapper>
        <CategoryContainer>
          {this.props.categories.map(category => (
            <Category
              key={category}
              category={category}
              onClick={this.handleCategoriesChecked.bind(this)}
            />
          ))}
        </CategoryContainer>
        {!this.isFirstImage() && (
          <ChevLeft>
            <Chevron direction="left" onClick={this.handleClick('prev')} />
          </ChevLeft>
        )}
        {!this.isLastImage() && (
          <ChevRight>
            <Chevron direction="right" onClick={this.handleClick('next')} />
          </ChevRight>
        )}
        {this.props.isLoading ? (
          <LoadingContainer>
            <ReactLoading
              type="spinningBubbles"
              color="#000"
              height="100px"
              width="100px"
            />
            <p>Loading...</p>
          </LoadingContainer>
        ) : (
          <ImageContainer>
            {!this.isFirstImage() && (
              <Image
                image={this.props.images[this.state.index - 1]}
                containerClass="previous__image"
              />
            )}
            <Image
              image={this.props.images[this.state.index]}
              containerClass="current__image"
            />
            {!this.isLastImage() && (
              <Image
                image={this.props.images[this.state.index + 1]}
                containerClass="next__image"
              />
            )}
          </ImageContainer>
        )}
      </Wrapper>
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
