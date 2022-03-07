import React from "react";
import './styles/CustomTable.css';

function CustomTableEntry(props) {
    return (
      <div className='tableEntry' >
        {/*<div className='holder orderCustName'> {props.name}</div>*/}
        <div className='holder orderDate'> {props.date}</div>
        <div className='holder orderItem'> {props.item}</div>
        <div className='holder orderStatus'> {props.status}</div>
      </div>
    );
}

export default CustomTableEntry;