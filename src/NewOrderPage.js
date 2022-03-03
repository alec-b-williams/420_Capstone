import React from 'react';
import SKUForm from './SKUForm.js';
import './styles/NewOrderPage.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default class NewOrderPage extends React.Component {
  // We can add error case if need to


  constructor(props) {
    super(props);
    this.state = {
      SKUs: null,
      selSKU: null,
      components: null,
      selComponent: null,
      name: null,
      address: null,
      company: null,
      city: null,
      zip: null,
      country: null,
      fileURL: null
    }

    this.fetchSKUs = this.fetchSKUs.bind(this);
    this.fetchComponents = this.fetchComponents.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.createNotification = this.createNotification.bind(this);
  }

  componentDidMount() {
    this.fetchSKUs();
    this.fetchComponents();
  }

  render() {
    return(

      <div>
        <div data-testid = "SKU" className="SKUForm">
          <button className="SKUButton" /*onClick={this.createNotification('error')}*/ onClick={this.postOrder}> Create Order </button>
          <SKUForm
            SKUList={this.state.SKUs}
            ComponentList={this.state.components}
            setSKU={(s) => this.updateSKU(s)}
            setComponent={(c) => this.updateComponent(c)}
            setName={(v) => this.setState({name: v})}
            setAddress={(v) => this.setState({address: v})}
            setCompany={(v) => this.setState({company: v})}
            setCity={(v) => this.setState({city: v})}
            setZip={(v) => this.setState({zip: v})}
            setCountry={(v) => this.setState({country: v})}
            setURL={(v) => this.setState({fileURL: v})}
            trigger={true}>
          </SKUForm>
        </div>
        <NotificationContainer/>
      </div>
    )
  }

  updateSKU(SKU) {
    if (SKU != -1) {
      console.log("Setting new SKU: " + SKU);
      this.setState({selSKU: SKU});
      this.fetchComponents(SKU);
    }
  }

  updateComponent(Component) {
    if (Component != -1) {
      console.log("Setting new Component: " + Component);
      this.setState({selComponent: Component});
      this.fetchComponents(Component);
    }
  }

  // Sku Section
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

  // Component Section
  fetchComponents(newSKU) {
    var _components;

    fetch("/products?productID=" + newSKU, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(_data => _components = _data)
    .then(() => console.log(_components))
    .then(() => this.setState({components: _components}))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // Posting orders to the backend
  postOrder() {
    let sku = this.state.SKUs.data.find(item => {
      return item.code === this.state.selSKU
    })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin": "*", },
      body: JSON.stringify({
        "destination": {
          "name": "wsu-test-team-8",
          "status": "live",
        },
        "orderData": {
          "customerName": "wsu-test-team-8" ,
          "items": [{
            "attributes": [],
            "reprintCount": 0,
            "quantity": 1,
            "shipmentIndex": 0,
            "status": "live",
            "scanned": 0,

            "sku": "HP-Orthotic-Right", //enter SKU number, // from SiteFlow (ex. "HP-Orthotic-Left")
            "sourceItemId": this.state.selSKU,  // !!!!!!! ask about this  !!!!!!!
              "productId": (sku == null ? "" : sku.productId),
            "components": [
              {
                "fetch": false,
                "code": "Orthotic-Component", // from SiteFlow (ex. "Orthotic-Component")
                "path": this.state.fileURL // TBC: should point to a file somewheres up in the clouds (see https://github.com/3MFConsortium/3mf-samples/tree/master/examples/beam%20lattice)
              }
            ]
          }],
          "shipments": [
            {
              "items" : [{
                "attributes": [],
                "reprintCount": 0,
                "quantity": 1,
                "shipmentIndex": 0,
                "status": "live",
                "scanned": 0,

                "sku": (sku == null ? "" : sku.productId), //enter SKU number, // from SiteFlow (ex. "HP-Orthotic-Left")
                "sourceItemId": this.state.selSKU,  // !!!!!!! ask about this  !!!!!!!
                "components": [
                  {
                    "fetch": false,
                    "code": this.state.selComponent, // from SiteFlow (ex. "Orthotic-Component")
                    "path": this.state.fileURL // TBC: should point to a file somewheres up in the clouds (see https://github.com/3MFConsortium/3mf-samples/tree/master/examples/beam%20lattice)
                  }
                ]
              }],
              "shipTo": {
                "name": this.state.name,
                "companyName": this.state.company,
                "address1": this.state.address,
                "town": this.state.city,
                "postcode": this.state.zip,
                "isoCountry": this.state.country
              },
             "carrier": {
                "code": "customer",
                "service": "shipping"
              }
            }
          ]
        }
      })
    };

    console.log(requestOptions.body)
    var postData;
    fetch('/order', requestOptions)
        .then(response => postData = response)
        .then(() => this.createNotification(postData.status))
  }

  createNotification(handling) {
    switch (handling) {
      case '200':
      case '201':
      case 200:
      case 201:
        console.log("creating notif")
        NotificationManager.success(handling + ' OK', 'Order has sent');
        break;
      case 400:
        console.log("creating notif")
        NotificationManager.error('400 ERROR', 'Order failed');
        break;
      case '500':
        NotificationManager.error('500 ERROR', 'Order failed');
        break;
      case 'warning':
        NotificationManager.warning('Placeholder', 'Placeholder');
        break;
      default:
        return 'success';
    }
  }
}
