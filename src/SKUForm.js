import React from 'react'
import countries from 'countries-list'
import './styles/SKUForm.css';

function SKUForm(props) {
  let CountryOptions = [];
  let SKUOptions = [];
  let ComponentOptions = [];

  CountryOptions.push(
    <option value={-1}></option>
  )
  CountryOptions.push(
    <option value="US">United States</option>
  )

  try {
      let countryNames = Object.keys(countries.countries)
      countryNames.forEach (country => {
        CountryOptions.push(
          <option value={country}>{countries.countries[country].name}</option>
        )
    })
  } catch {
    console.log("error generating CountryOptions")
  }

  SKUOptions.push(
    <option value={-1}></option>
  )

  try {
    props.SKUList?.data.forEach( SKU => {
      SKUOptions.push(
        <option value={SKU.code}>{SKU.description}</option>
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
      <div className="pop-up">
          <div className="popup-inner">
              <form id="sku-selection"> 

                <header className='title'> Shipping Info </header>
                <div className="userName">
                  Name 
                  <input type="text" id="NameField" placeholder="" onChange={(o) => props.setName(o.target.value)}></input>
                </div>

                <div className="address">
                  Address 
                  <input type="text" id="AddressField" placeholder="" onChange={(o) => props.setAddress(o.target.value)}></input>
                </div>

                <div className="companyName">
                  Company
                  <input type="text" id="Company" placeholder="" onChange={(o) => props.setCompany(o.target.value)}></input>
                </div>

                <div className="city">
                  City
                  <input type="text" id="cityLoc" placeholder="" onChange={(o) => props.setCity(o.target.value)}></input>
                </div>

                <div className="postalCode">
                  Postal/Zip
                  <input type="text" onKeyPress={(event) => { if(!/[0-9]/.test(event.key)) { event.preventDefault(); }}} id="postal" placeholder="" onChange={(o) => props.setZip(o.target.value)}></input>
                </div>

                <div className="country">
                  Country
                  <select name="ISO" id="ISOCombo" onChange={(o) => props.setCountry(o.target.value)}>
                    {CountryOptions}
                  </select>
                </div>

                <div className="fileLink">
                  File URL
                  <input type="text" id="FileURL" placeholder="" onChange={(o) => props.setURL(o.target.value)}></input>
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
  ) : "";
}

export default SKUForm;
