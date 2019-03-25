import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchImages } from './actions';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import ImageCarousel from './components/ImageCarousel';
import Category from './components/Category';

// The App component is responsible for communicating and managing top level redux state and logic,
// leaving the children to simply work on rendering the view
// Images are only ever obtained from redux and never stored in state

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
    font-size: 20px;
  }
`;

class App extends Component {
  state = {
    categoryToDisplay: 'cats',
    index: 0,
    categoriesChecked: ['cats'],
  };
  // Handles when the category button is click and called handler to change categories and fetch
  // new list of images
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
      categoriesChecked.length === this.props.categories.length
        ? 'all'
        : categoriesChecked[0];
    this.setState({ categoryToDisplay, index: 0 });
    if (this.state.categoriesChecked[0]) {
      this.props.fetchImages(categoryToDisplay);
    }
  };
  // Keeps track of which image/index in the the array the component are on
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

  //When component first mounts, 'Cats' image list is fetched by default
  componentDidMount() {
    this.props.fetchImages(this.state.categoryToDisplay);
  }
  render() {
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
        {this.props.isLoading && (
          <LoadingContainer>
            <ReactLoading
              type="spinningBubbles"
              color="#77ff00"
              height="100px"
              width="100px"
            />
            <p>Loading...</p>
          </LoadingContainer>
        )}
        {this.state.categoriesChecked.length === 0 && (
          <LoadingContainer>
            <p>Please pick at least one category</p>
          </LoadingContainer>
        )}
        {!this.props.isLoading && this.state.categoriesChecked.length > 0 && (
          <ImageCarousel
            index={this.state.index}
            handleIndex={this.handleIndex}
          />
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
