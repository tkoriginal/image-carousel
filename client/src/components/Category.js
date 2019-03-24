import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 10px;
`;
const Input = styled.input`
  display: none;
  :checked + label {
    background-color: blue;
  }
`;

const Label = styled.label`
  display: block;
  width: 100px;
  padding: 7px 15px;
  color: #fff;
  background-color: #333;
  border-radius: 6px;
  text-align: center;
`;

export default function Category(props) {
  return (
    <Wrapper key={props.category}>
      <Input
        // style={{ display: 'none' }}
        type="checkbox"
        id={props.category}
        value={props.category}
        defaultChecked={props.category === 'cats' ? 'checked' : null}
        onClick={props.onClick}
      />
      <Label htmlFor={props.category}>{props.category}</Label>
    </Wrapper>
  );
}
