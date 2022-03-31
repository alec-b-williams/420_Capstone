import React from "react";
import ReactComponent from "react";
import './styles/TableButton.css';

/* NOT USED */
function TableButton(props) {
    return (
      <button className= 'api-button' onClick={props.onClick}>{props.text}</button>
    );
}

export default TableButton;