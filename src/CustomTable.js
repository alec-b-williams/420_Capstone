import React from "react";
import './styles/CustomTable.css';

/* Table utilizes flexbox, table will display the existing orders from siteflow */
function CustomTableEntry(props) {
    return (
      <div className='tableEntry' >
        {/*<div className='holder orderCustName'> {props.name}</div>*/}
        <div className='holder orderID'> {props.orderid}</div>
        <div className='holder orderAddress'> {props.address}</div>
        <div className='holder orderItem'> {props.item}</div>
        <div className='holder orderSKU'> {props.SKU}</div>
        <div className='holder orderStatus'> {props.status}</div>
      </div>
    );
}

export default CustomTableEntry;