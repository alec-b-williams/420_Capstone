import React from "react";
import './CustomTable.css';

function CustomTableEntry(props) {
    return (
      <section>
      <div className='tableEntry' >
        <div className='holder orderCustName'> {props.name}</div>
        <div className='holder orderDate'> {props.date}</div>
        <div className='holder orderStatus'> {props.status}</div>
      </div>
      </section>
    );
}

export default CustomTableEntry;