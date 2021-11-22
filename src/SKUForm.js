import React from 'react'
import './styles/SKUForm.css';

function SKUForm(props) {
  let SKUOptions = [];
  let ComponentOptions = [];

  props.SKUList?.data.forEach( SKU => {
    SKUOptions.push(
      <option value={SKU.productId}>{SKU.description}</option>
    )
  });

  props.ComponentList?.data.forEach( Component => {
    ComponentOptions.push(
      //TODO: change once components are implemented
      //<option value={Component.productID}>{Component.description}</option>
    )
  });

  return (props.trigger) ? (
    <section>
      <div className="pop-up">
          <div className="popup-inner">
              <form id="sku selection"> 
                <div>
                  Name: 
                  <input type="text" id="NameField"></input>
                </div>
                <div>
                  SKU: 
                  <select name="SKU" onChange={(o) => props.setSKU(o.target.value)} id="SKUCombo">
                    {SKUOptions}
                  </select>
                </div>
                <div>
                  Component:
                  <select name="Component" id="ComponentCombo">
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
