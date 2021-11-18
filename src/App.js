import './App.css';
import './TableButton.css';
import './SKUForm.css';
import React from "react";
import TableButton from "./TableButton.js"
import CustomTableEntry from './CustomTable.js';
import SKUForm from './SKUForm.js'
import {useState} from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  render() {

    let tableEntries = [];
    
    tableEntries.push(<CustomTableEntry
    name={"Name"}
    date={"Date"}
    status={"Status"}/>)

    //do a for-loop here to generate a list of CustomTableEntries
    //for (var i=0; i < this.state.orders.data.length; i++) {
    this.state.orders?.data.forEach( order => {
      console.log(order._id)
      tableEntries.push(<CustomTableEntry 
        key={order._id}
        name={order.orderData.customerName}
        date={order.orderData.date} 
        status={order.orderData.status}/>)
      }
    );
    
    // Remind to self: need a switch page for table.
    // "Create Order" button needs to generate form when clicked on.
    return (
      <section>
        <div className="TableButton">
          <TableButton text="Get Orders" onClick={this.fetchOrders} />
       </div>

      <div className="CustomTable">
        {tableEntries} 
      </div>

      <div className="SKUForm">
        <button className="SKUButton" > Create Order </button>
        <SKUForm trigger={true}>
        </SKUForm>
      </div>

      </section>
    );
  }

  //testing webhook again!!
  fetchOrders() {
    var data;

    fetch("/orders", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(_data => data = _data)
    .then(() => console.log(data))
    .then(() => this.setState({orders: data}))
    .catch((error) => {
    console.error('Error:', error);
    });
  }
}
