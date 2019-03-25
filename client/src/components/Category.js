import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 10px;
`;
const Input = styled.input`
  display: none;
  :checked + label {
    background-color: #77dd77;
    color: #fff;
  }
`;

const Label = styled.label`
  display: block;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 100px;
  padding: 7px 15px;
  color: #999;
  background-color: #555;
  border-radius: 6px;
  text-align: center;
  transition: 0.3s all;
  cursor: pointer;
  :hover {
    transform: translateY(-2px);
  }
  :active {
    transform: translateY(2px);
  }
`;

export default function Category(props) {
  return (
    <Wrapper key={props.category}>
      <Input
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
