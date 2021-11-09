import React from "react";
import ReactComponent from "react";

function CustomButton(props) {
    return (
      <button className='api-button' onClick={props.onClick}>{props.text}</button>
    );
}

export default CustomButton;