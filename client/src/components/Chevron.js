import React from 'react';

export default function Chevron(props) {
  return (
    <i
      className={`fas fa-chevron-${props.direction}`}
      onClick={props.onClick}
    />
  );
}
