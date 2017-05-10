import React from 'react';
import './style/Button.css';

const Button = (props) => (
  <button onClick={props.handleClick} className={props.buttonClass}>{props.children}</button>
);

export default Button;
