import React from 'react';
import CustomTableEntry from './CustomTable';
import TableButton from "./TableButton.js";
import "./styles/ViewWrapper.css"

export default class ViewOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      index: 0,
      count: 10,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  render() {

    let header = (<CustomTableEntry
      //name={"Name"}
      date={"Date"}
      item={"Item"}
      status={"Status"}/>)
    let tableEntries = [];

    //do a for-loop here to generate a list of CustomTableEntries
    //for (var i=0; i < this.state.orders.data.length; i++) {
    this.state.orders?.data.forEach( order => {
      console.log(order._id)
      let date = new Date(order.orderData.date);
      let dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

      var status = "Other"; 
    
      switch(order.orderData.status) {
        case ('error'):
          status = "Error";
          break;
        case ('complete'):
          status = "Complete";
          break;
        case ('printready'):
          status = "Print Ready";
          break;
        case ('pending'):
          status = "Pending";
          break;
        case ('shipped'):
          status = "Shipped";
          break;
        case ('cancelled'):
          status = "Cancelled";
          break;
      }

      tableEntries.push(<CustomTableEntry 
        key={order._id}
        //name={order.orderData.customerName}
        date={dateString} 
        item={order._id}
        status={status}/>)
      }
    );



    return (
      <div id="ViewWrapper">
        <div data-testid = "tablebutton" className="TableButton">
          <TableButton text="Get Orders" onClick={this.fetchOrders} />
        </div>

        <div className="CustomTable">
          {header}
          {tableEntries.slice(this.state.index, this.state.index + this.state.count)} 
        </div>
      </div>
    );
  }

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
    //.then(response => console.log(response))
    .catch((error) => {
    console.error('Error:', error);
    });
  }
}

