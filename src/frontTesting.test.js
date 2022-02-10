import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import TableButton from './TableButton';
import NewOrderPage from './NewOrderPage';
import ViewOrderPage from './ViewOrderPage';
import SKUForm from './SKUForm';
import { createRenderer } from 'react-dom/test-utils';

afterEach(cleanup);

test("renders without crashing", ()=>{  
    const div = document.createElement("div");
    ReactDOM.render(<ViewOrderPage></ViewOrderPage>, div);  // View order's page rendering
})

test("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<NewOrderPage></NewOrderPage>, div); // Create orders page rendering
})  

// rendering buttons test still in progress, not working yet
/*
test("renders table button correctly", ()=>{
    const {getByTestId} = render(<TableButton text = "Get Orders"></TableButton>)
    expect(getByTestId('tableButton')).toHaveTextContent("Get Orders");
})

test("renders create button correctly", ()=>{
    const {getByTestId} = render(<SKUForm text = "Create Order"></SKUForm>)
    expect(getByTestId('SKU')).toHaveTextContent("Create Order");
})
*/