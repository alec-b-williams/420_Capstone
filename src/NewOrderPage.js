import React from 'react';
import SKUForm from './SKUForm.js';
import './styles/NewOrderPage.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default class NewOrderPage extends React.Component {
  // We can add error case if need to 
  createNotification = (handling) => {
    return () => {
      switch (handling) {
        case 'success':
          NotificationManager.success('200 OK', 'Order has sent');
          break;
        default:
          return 'success'
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      SKUs: null,
      selSKU: null,
      components: null,
      selComponent: null,
    }

    this.fetchSKUs = this.fetchSKUs.bind(this);
  }

  componentDidMount() {
    this.fetchSKUs();
  }

  render() {
    return(
      <div>
        <div className="SKUForm">
          <button className="SKUButton" onClick={this.createNotification('success')}> Create Order </button>
          <SKUForm 
            SKUList={this.state.SKUs} 
            ComponentList={this.state.components}
            setSKU={(s) => this.updateSKU(s)}
            trigger={true}>
          </SKUForm>
        </div>
        <NotificationContainer/>
      </div>
    )
  }

  fetchSKUs() {
    var _SKUs;

    fetch("/skus", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(_data => _SKUs = _data)
    .then(() => console.log(_SKUs))
    .then(() => this.setState({SKUs: _SKUs}))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  updateSKU(SKU) {
    console.log("Setting new SKU: " + SKU);
    this.setState({selSKU: SKU});
    this.fetchComponents(SKU);
  }

  fetchComponents(SKU) {
    var components;

    //fetch()
  }
}