import React from 'react';
import SKUForm from './SKUForm.js';

export default class NewOrderPage extends React.Component {
  

  render() {

    return(
      <div>
        <div className="SKUForm">
          <button className="SKUButton" > Create Order </button>
          <SKUForm trigger={true}>
          </SKUForm>
        </div>
      </div>
    )
  }
}