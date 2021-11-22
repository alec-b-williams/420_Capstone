import './App.css';
import './TableButton.css';
import './SKUForm.css';
import React from 'react';
import { Switch, Route } from 'navigo-react';
import ViewOrderPage from './ViewOrderPage';
import NewOrderPage from './NewOrderPage';

export default class App extends React.Component {
  // Remind to self: need a switch page for table.
  // "Create Order" button needs to generate form when clicked on.
  render() {
    return (
      <>
      <nav>
        <a href="/" data-navigo>View Orders</a>
        <a href="/new" data-navigo>New Order</a>
      </nav>
      <Switch>
        <Route path="/">
          <ViewOrderPage />
        </Route>
        <Route path="/new">
          <NewOrderPage />
        </Route>
      </Switch>
      </>
    );
  }
}

