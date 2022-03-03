import React from 'react';
import CustomTableEntry from './CustomTable';
import TableButton from "./TableButton.js";
import OrdersTable from './OrdersTable.js';
import "./styles/ViewWrapper.css"

export default class ViewOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    /*tableEntries.push(<CustomTableEntry
    name={"Name"}
    date={"Date"}
    status={"Status"}/>)*/

    //do a for-loop here to generate a list of CustomTableEntries
    //for (var i=0; i < this.state.orders.data.length; i++) {
    this.state.orders?.data.forEach( order => {
      console.log(order.orderData)
    });

    return (
      <div id="ViewWrapper">
        <div data-testid = "tablebutton" className="TableButton">
          <TableButton text="Get Orders" onClick={this.fetchOrders} />
        </div>

        {/*<div id="SearchWrapper">
          <input type="text" id="SearchField" maxLength="20" placeholder="" onChange={(o) => props.setAddress(o.target.value)}></input>
        </div>*/}

        {/*<div className="CustomTable">
          {tableEntries} 
        </div>*/}

        <OrdersTable orders={this.state.orders}/>
      </div>
    );
  }

  fetchOrders = () => {
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

