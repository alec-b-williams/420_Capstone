import React from 'react'
import countries from 'countries-list'
import './styles/SKUForm.css';
import { IoMdPerson, IoMdPeople } from "react-icons/io";
import { MdLocationOn, MdLocationCity, MdShareLocation } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";

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
  
  /* Input bar/text in New Order form with input sanitization */
  return (props.trigger) ? (
    <div id="pop-up">
      <div className="popup1">
        <form id="sku-selection"> 
          <header className='title'> Contact Info </header>
          <div className="userName">
          <IoMdPerson color="rgb(56, 102, 255)" size="0.75em"/> Name 
            <input 
              type="text" 
              onKeyPress={(event) => { if(!/[a-zA-Z\s\-']/.test(event.key)) { event.preventDefault(); }}} 
              maxLength="28" 
              id="NameField" 
              placeholder="" 
              onChange={(o) => props.setName(o.target.value)}>  
            </input>
          </div>

          <div className="companyName">
          <IoMdPeople color="rgb(56, 102, 255)" size="0.75em"/> Company
            <input 
              type="text" 
              id="Company" 
              maxLength="28" 
              placeholder="" 
              onChange={(o) => props.setCompany(o.target.value)}>
            </input>
          </div>
        </form>
        {props.children}
      </div>

      <div className="popup2">
        <form id="sku-selection"> 
          <header className='title'> Location </header>
          <div className="address">
          <MdLocationOn color="rgb(56, 102, 255)" size="0.75em"/> Address 
            <input 
              type="text" 
              id="AddressField" 
              maxLength="20" 
              placeholder="" 
              onChange={(o) => props.setAddress(o.target.value)}>  
            </input>
          </div>

          <div className="city">
          <MdLocationCity color="rgb(56, 102, 255)" size="0.75em"/> City
            <input 
              type="text" 
              onKeyPress={(event) => { if(!/[a-zA-Z\s\-']/.test(event.key)) { event.preventDefault(); }}} 
              maxLength="20" 
              id="cityLoc" 
              placeholder="" 
              onChange={(o) => props.setCity(o.target.value)}>
            </input>
          </div>

          <div className="postalCode">
          <TiLocationArrow color="rgb(56, 102, 255)" size="0.75em"/> Postal Code
            <input 
              type="text" 
              onKeyPress={(event) => { if(!/[0-9\s-]/.test(event.key)) { event.preventDefault(); }}} 
              maxLength="10" 
              id="postal" 
              placeholder="" 
              onChange={(o) => props.setZip(o.target.value)}>
            </input>
          </div>

          <div className="country">
          <MdShareLocation color="rgb(56, 102, 255)" size="0.75em"/> Country
            <select name="ISO" id="ISOCombo" onChange={(o) => props.setCountry(o.target.value)}>
              {CountryOptions}
            </select>
          </div>

        </form>
        {props.children}
      </div>
     
      <div className="popup3">
        <form id="sku-selection"> 
          <header className='title'> Parts </header>
          
          <div className="fileLink">
            File URL
            <input 
              type="text" 
              id="FileURL" 
              placeholder="" 
              onChange={(o) => props.setURL(o.target.value)}>
            </input>
          </div>

          <div className="skuSelect">
            SKU
            <input 
              type="text" 
              name="SKU" 
              list="SKUComboDatalist" 
              id="SKUCombo" 
              onChange={(o) => props.setSKU(o.target.value)}/>
            <datalist id="SKUComboDatalist">
              {SKUOptions}
            </datalist>
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

      <div id="SKUButtonWrapper">
        <button className="SKUButton" onClick={() => props.onClick()}> Create Order </button>
      </div>
    </div>
  ) : "";
}

export default SKUForm;
