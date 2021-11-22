import './styles/App.css';
import './styles/TableButton.css';
import './styles/CustomTable.css';
import './styles/SKUForm.css';
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
        <button className='ViewO' href="/" data-navigo>View Orders</button>
        <button className='NewO' href="/new" data-navigo>New Order</button>
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

