import React from 'react';
import styled from 'styled-components';

// Image is set to background image of DIV for easier manipulation
// Can be modified in a future implementation

const Wrapper = styled.div`
  margin: 0;
  width: 800px;
  height: 600px;
  background: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

function Image(props) {
  return <Wrapper image={props.image} />;
}

export default Image;
