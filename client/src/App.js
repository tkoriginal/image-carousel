import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchImages } from './actions';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import './css/app.css';

import ImageCarousel from './components/ImageCarousel';
import Category from './components/Category';

const MainContent = styled.main`
  width: 1100px;
  height: 750px;
  background: #333;
  margin: 7em auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  font-size: 20px;
  margin: 30px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  height: 520px;
  & p {
    color: #77dd77;
  }
`;
class App extends Component {
  state = {
    categoryToDisplay: 'cats',
    index: 0,
    categoriesChecked: ['cats'],
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

  componentDidMount() {
    this.props.fetchImages(this.state.categoryToDisplay);
  }
  render() {
    const { index } = this.state;
    return (
      <MainContent>
        <CategoryContainer>
          {this.props.categories.map(category => (
            <Category
              key={category}
              category={category}
              onClick={this.handleCategoriesChecked.bind(this)}
            />
          ))}
        </CategoryContainer>
        {this.props.isLoading ? (
          <LoadingContainer>
            <ReactLoading
              type="spinningBubbles"
              color="#77dd77"
              height="100px"
              width="100px"
            />
            <p>Loading...</p>
          </LoadingContainer>
        ) : (
          <ImageCarousel index={index} handleIndex={this.handleIndex} />
        )}
      </MainContent>
    );
  }
}
const mapStateToProps = state => ({
  images: state.app.images,
  categories: state.app.categories,
  isLoading: state.app.isLoading,
});
App.propTypes = {
  categories: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  fetchImages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default connect(
  mapStateToProps,
  { fetchImages },
)(App);
