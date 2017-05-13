import React from 'react';
import '../css/buttons.css';

// TODO: style the buttons
const Button = (props) => (
  <button onClick={props.handleClick} className={props.buttonClass}>{props.children}</button>
);

export default Button;
