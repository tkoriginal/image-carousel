import React from 'react';

export default function Image(props) {
  return (
    <div className={props.containerClass}>
      <img src={props.image} alt="cats or sharks" />
    </div>
  );
}
