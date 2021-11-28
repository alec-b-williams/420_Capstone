import React from 'react'
import './styles/SKUForm.css';

function SKUForm(props) {
  let SKUOptions = [];
  let ComponentOptions = [];

  try {
    props.SKUList?.data.forEach( SKU => {
      SKUOptions.push(
        <option value={SKU.productId}>{SKU.description}</option>
      );
    });
  } catch {
    console.log("Error generating SKUOptions");
  }

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
                  Name: 
                  <input type="text" id="NameField" placeholder="Enter your Name"></input>
                </div>
                <div className="skuSelect">
                  SKU: 
                  <select name="SKU" onChange={(o) => props.setSKU(o.target.value)} id="SKUCombo">
                    {SKUOptions}
                  </select>
                </div>
                <div className="compSelect">
                  Component: 
                  <select name="Component" onChange={(o) => props.setComponent(o.target.value)} id="ComponentCombo">
                    {ComponentOptions}
                  </select>
                </div>
              </form>
              <button className="close-btn">x</button>
              {props.children}
          </div>
      </div>
    </section>
  ) : "";
}

export default SKUForm;
