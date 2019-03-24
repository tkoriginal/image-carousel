import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

function ImagesContainer(props) {
  return (
    <Wrapper>
      <Image
        image={props.images[props.index]}
        containerClass="current__image"
      />
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  images: state.app.images,
});

ImagesContainer.propTypes = {
  images: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(ImagesContainer);
