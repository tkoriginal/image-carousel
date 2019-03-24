import React from 'react';

export default function Category(props) {
  return (
    <div key={props.category}>
      <input
        // style={{ display: 'none' }}
        type="checkbox"
        id={props.category}
        value={props.category}
        defaultChecked={props.category === 'cats' ? 'checked' : null}
        onClick={props.onClick}
      />
      <label htmlFor={props.category}>{props.category}</label>
    </div>
  );
}
