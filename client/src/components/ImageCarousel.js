import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chevron from './Chevron';
import { connect } from 'react-redux';
import ImagesContainer from './ImagesContainer';
const Wrapper = styled.article`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ChevLeft = styled.div`
  position: absolute;
  z-index: 2;
  top: 50;
  left: 15px;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  & i:hover {
    color: #999;
  }
`;
const ChevRight = styled.div`
  position: absolute;
  z-index: 2;
  top: 50;
  right: 15px;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  & i:hover {
    color: #999;
  }
`;
const isFirstImage = imageIndex => {
  return imageIndex < 1;
};
const isLastImage = (imageIndex, totalImages) => {
  return imageIndex === totalImages - 1;
};
class ImagesCarousel extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
        console.log('fire right');
        this.props.handleIndex('next');
        break;
      case 'ArrowLeft':
        console.log('first left');
        this.props.handleIndex('prev');
        break;
      default:
        break;
    }
  };

  handleClick = action => {
    return () => {
      this.props.handleIndex(action);
    };
  };

  render() {
    return (
      <Wrapper>
        {!isFirstImage(this.props.index) && (
          <ChevLeft>
            <Chevron direction="left" onClick={this.handleClick('prev')} />
          </ChevLeft>
        )}
        {!isLastImage(this.props.index, this.props.images.length) && (
          <ChevRight>
            <Chevron direction="right" onClick={this.handleClick('next')} />
          </ChevRight>
        )}
        <ImagesContainer index={this.props.index} />
      </Wrapper>
    );
  }
}

ImagesCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  images: state.app.images,
});
export default connect(mapStateToProps)(ImagesCarousel);
