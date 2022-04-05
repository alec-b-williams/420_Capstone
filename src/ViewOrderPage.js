import React, {useState} from 'react';
import CustomTableEntry from './CustomTable';
import TableButton from "./TableButton.js";
import "./styles/ViewWrapper.css"
import orderBy from 'lodash/orderBy';

var _ = require('lodash');

const invertDirect = {
  asc: 'desc',
  desc: 'asc'
}

export default class ViewOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      index: 0,
      count: 10,
      searchVal: "",
      dateSort: 0,
      itemSort: 0,
      statusSort: 0,
      columnToSort: '',
      sortDirection: 'desc',
    }

    this.fetchOrders = this.fetchOrders.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    let header = (
      <div className='tableEntry' >
        <button className='holder orderID' onClick={() => this.handleSort('id')}>Order ID</button>
        <button className='holder orderAddress' onClick={() => this.handleSort('order.orderData.shipments[0].shipTo.address1')}>Address</button>
        <button className='holder orderItem' onClick={() => this.handleSort('order.orderData.items[0].sku')}>Item</button>
        <button className='holder orderSKU' onClick={() => this.handleSort('order.orderData.items[0].productId')}>SKU</button>
        <button className='holder orderStatus' onClick={() => this.handleSort('order.orderData.status')}>Status</button>
      </div>
    )

    let tableEntries = [];
    let orders =  this.state.orders

    if (orders != null) {
      orders.data = _.orderBy(this.state.orders.data, this.state.columnToSort, this.state.sortDirection)

      orders?.data.forEach( order => {
        let id = order.id
        let item = order.order.orderData.items[0].sku
        let SKU = order.order.orderData.items[0].productId
        let address = order.order.orderData.shipments[0].shipTo
        let addressString = address.address1 + ", " + address.town + " " + address.isoCountry + ", " + address.postcode

        var status = order.order.orderData.status; 
      
        switch(order.order.orderData.status) {
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

        //TODO: update search later when changing item from order._id to SKU name\
        if (this.state.searchVal == "" || 
        order.order.orderData.items[0].sku.toLowerCase().includes(this.state.searchVal.toLowerCase()))
          tableEntries.push(<CustomTableEntry 
            orderid={id}
            key={order._id} 
            SKU={SKU}
            address={addressString}
            item={item}
            status={status}/>)
          }
      );
    }
    
    let start = (this.state.index * this.state.count) + 1
    let end = ((this.state.index * this.state.count) + this.state.count) + 1

    return (
      <div id="ViewWrapper">
        <div>
          Search Items: {'\u00A0'}
          <input id="searchField" onChange={(v) => this.setState({searchVal: v.target.value}, ()=>console.log(this.state.searchVal))}></input>
        </div>

        <div className="CustomTable">
          {header}
          {tableEntries.slice(this.state.index * this.state.count, 
            (this.state.index * this.state.count) + this.state.count)} 
        </div>

        <div className="PageControls">
          Displaying entries {start} - {end-1} {'\u00A0'}

          <button onClick={() => this.setState({index: 0})}>{"<<"}</button>

          <button onClick={() => {
            if (this.state.index > 0)
              this.setState({index: this.state.index - 1})
          }}>{"<"}</button>

          {this.state.index + 1}

          <button onClick={() => {
            if (this.state.index < ~~(tableEntries.length / this.state.count))
              this.setState({index: this.state.index + 1})
          }}>{">"}</button>

          <button onClick={() => this.setState({index: ~~(tableEntries.length / this.state.count)})}>{">>"}</button>

          Entries per page: {'\u00A0'}

          <select id="rowCountSelect" onChange={(v) => {
              console.log("updating count: " + v.target.value)
              this.setState({
                count: parseInt(v.target.value), 
                index: 0,
              })
            }}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
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
    .then(() => this.setState({orders: data}, () => {
      console.log("added data")
      console.log(this.state.orders)
    }))
    .catch((error) => {
    console.error('Error:', error);
    });
  }

  handleSort(columnName) { 
    this.setState({
      columnToSort: columnName,
      sortDirection: this.state.columnToSort === columnName ? invertDirect[this.state.sortDirection] : 'asc',
    }, () => {
      console.log("column name: " + this.state.columnToSort + ", dir: " + this.state.sortDirection);
    });
  }
}
