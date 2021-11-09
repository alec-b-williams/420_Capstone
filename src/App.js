import './App.css';
import './CustomButton.css';
import React from "react";
import CustomButton from "./CustomButton.js"
import CustomTableEntry from './CustomTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  render() {

    let tableEntries = [];

    //do a for-loop here to generate a list of CustomTableEntries
    if (this.state.orders != null) {
      for (var i=0; i < this.state.orders.data.length; i++) {
        let order = this.state.orders.data[i];
        //console.log(order._id);
        tableEntries.push(<CustomTableEntry text={order.orderData.customerName} key={order._id}/>)
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <CustomButton text="Get Orders" onClick={this.fetchOrders} />
          <div className='tableContainer'>
            {tableEntries}
          </div>
        </header>
      </div>
    );
  }

  fetchOrders() {
    var data;

    fetch("/orders")
    .then(response => response.json())
    .then(_data => data = _data)
    .then(() => console.log(data))
    .then(() => this.setState({orders: data}));
  }
}

export default App;
