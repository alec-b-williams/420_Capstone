import React from "react";


function CustomTableEntry(props) {
    return (
      <div className='tableEntry' >
        <div className='orderCustName'>
          {props.name}
        </div>
        <div className='orderDate'>
          {props.date}
        </div>
        <div className='orderStatus'>
          {props.status}
        </div>
      </div>
    );
}

export default CustomTableEntry;