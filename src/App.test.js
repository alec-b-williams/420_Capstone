import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';


test("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<App></App>, div);
    ReactDOM.unmountComponentAtNode(div);
})
