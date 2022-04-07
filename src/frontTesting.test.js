import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import NewOrderPage from './NewOrderPage';
import ViewOrderPage from './ViewOrderPage';
//import { createRenderer } from 'react-dom/test-utils';

afterEach(cleanup);

test("renders View page without crashing", ()=>{  
    const div = document.createElement("div");
    ReactDOM.render(<ViewOrderPage></ViewOrderPage>, div);  // View order's page rendering
})

test("renders Create page without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<NewOrderPage></NewOrderPage>, div); // Create orders page rendering
})  

//------------------------------------------------------------------------------------

// Order ID button
test("renders orderID button correctly", ()=>{
    const {getByTestId} = render(<ViewOrderPage text = "Order ID"></ViewOrderPage >)
    expect(getByTestId('table')).toHaveTextContent("Order ID");
})

// Item button
test("renders Item button correctly", ()=>{
    const {getByTestId} = render(<ViewOrderPage text = "Item"></ViewOrderPage >)
    expect(getByTestId('table')).toHaveTextContent("Item");
})

// Address button
test("renders Address button correctly", ()=>{
    const {getByTestId} = render(<ViewOrderPage text = "Address"></ViewOrderPage >)
    expect(getByTestId('table')).toHaveTextContent("Address");
})

// SKU button
test("renders SKU button correctly", ()=>{
    const {getByTestId} = render(<ViewOrderPage text = "SKU"></ViewOrderPage >)
    expect(getByTestId('table')).toHaveTextContent("SKU");
})

// Status button
test("renders Status button correctly", ()=>{
    const {getByTestId} = render(<ViewOrderPage text = "Status"></ViewOrderPage >)
    expect(getByTestId('table')).toHaveTextContent("Status");
})

// Create order button
test("renders create button correctly", ()=>{
    const {getByTestId} = render(<NewOrderPage text = "Create Order"></NewOrderPage>)
    expect(getByTestId('SKU')).toHaveTextContent("Create Order");
})