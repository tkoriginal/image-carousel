import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

function ImagesContainer(props) {
  return (
    <Wrapper>
      <Image image={props.images[props.index]} />
    </Wrapper>
  );
}

ImagesContainer.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ImagesContainer;
