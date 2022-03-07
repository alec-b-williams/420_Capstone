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
      searchVal: "",
      dateSort: 0,
      itemSort: 0,
      statusSort: 0,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  render() {

    let header = (
      <div className='tableEntry' >
        <button className='holder orderDate'>Date</button>
        <button className='holder orderItem'>Item</button>
        <button className='holder orderStatus'>Status</button>
      </div>
    )
    let tableEntries = [];

    //do a for-loop here to generate a list of CustomTableEntries
    //for (var i=0; i < this.state.orders.data.length; i++) {
    this.state.orders?.data.forEach( order => {
      //console.log(order._id)
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

      //TODO: update search later when changing item from order._id to SKU name\
      if (this.state.searchVal == "" || order._id.includes(this.state.searchVal))
        tableEntries.push(<CustomTableEntry 
          key={order._id}
          date={dateString} 
          item={order._id}
          status={status}/>)
        }
    );

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
          Displaying entries {start} - {end} {'\u00A0'}

          <button onClick={() => this.setState({index: 0})}>{"First"}</button>

          <button onClick={() => {
            if (this.state.index > 0)
              this.setState({index: this.state.index - 1})
          }}>{"Prev"}</button>

          {this.state.index + 1}

          <button onClick={() => {
            if (this.state.index < ~~(tableEntries.length / this.state.count))
              this.setState({index: this.state.index + 1})
          }}>{"Next"}</button>

          <button onClick={() => this.setState({index: ~~(tableEntries.length / this.state.count)})}>{"Last"}</button>

          Entries per page: {'\u00A0'}

          <select id="rowCountSelect" onChange={(v) => {
              console.log("updating count: " + v.target.value)
              this.setState({count: parseInt(v.target.value)})
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
    .then(() => this.setState({orders: data}))
    //.then(response => console.log(response))
    .catch((error) => {
    console.error('Error:', error);
    });
  }


}

