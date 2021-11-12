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

    return (
      <section>
        <div className="Button">
        <CustomButton text="Get Orders" onClick={this.fetchOrders} />
       </div>
      <div className="App">
          <div className='tableContainer'>
            {tableEntries}
          </div>  
      </div>
      </section>
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
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

export default App;
