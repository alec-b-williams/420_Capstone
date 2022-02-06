import React from 'react'
import './styles/SKUForm.css';

function SKUForm(props) {
  let SKUOptions = [];
  let ComponentOptions = [];

  SKUOptions.push(
    <option value={-1}></option>
  )

  try {
    props.SKUList?.data.forEach( SKU => {
      SKUOptions.push(
        <option value={SKU.productId}>{SKU.description}</option>
      );
    });
  } catch {
    console.log("Error generating SKUOptions");
  }

  ComponentOptions.push(
    <option value={-1}></option>
  )

  try {
    props.ComponentList?.data.forEach( Component => {
      ComponentOptions.push(
        //TODO: change once components are implemented
        <option value={Component.productID}>{Component.description}</option>
      )
    });
  } catch {
    console.log("Error generating ComponentOptions");
  }
  

  return (props.trigger) ? (
    <section>
      <div className="pop-up">
          <div className="popup-inner">
              <form id="sku-selection"> 
              
                <div className="userName">
                  Name 
                  <input type="text" id="NameField" placeholder=""></input>
                </div>

                <div className="address">
                  Address 
                  <input type="text" id="AddressField" placeholder=""></input>
                </div>

                <div className="companyName">
                  Company
                  <input type="text" id="Company" placeholder=""></input>
                </div>

                <div className="city">
                  City
                  <input type="text" id="cityLoc" placeholder=""></input>
                </div>

                <div className="postalCode">
                  Postal/Zip
                  <input type="text" id="postal" placeholder=""></input>
                </div>

                <div className="fileLink">
                  File URL
                  <input type="text" id="FileURL" placeholder=""></input>
                </div>

                <div className="skuSelect">
                  SKU
                  <select name="SKU" onChange={(o) => props.setSKU(o.target.value)} id="SKUCombo">
                    {SKUOptions}
                  </select>
                </div>

                <div className="compSelect">
                  Component
                  <select name="Component" onChange={(o) => props.setComponent(o.target.value)} id="ComponentCombo">
                    {ComponentOptions}
                  </select>

                </div>
              </form>
              {props.children}
          </div>

      </div>
    </section>
  ) : "";
}

export default SKUForm;
