import './styles/App.css';
import './styles/TableButton.css';
import './styles/CustomTable.css';
import './styles/SKUForm.css';
import React from 'react';
import { Switch, Route } from 'navigo-react';
import ViewOrderPage from './ViewOrderPage';
import NewOrderPage from './NewOrderPage';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, } from 'react-bootstrap';

/* 
   App will start from here, 
   Switch utilizes navigo react module.  
   Navbar utilizes react bootstrap 
*/

export default class App extends React.Component {
  render() {
    return (  
  <div>
  <Navbar className="navigationBar" fixed="top"  variant="dark">
    <Container>
    <Navbar.Brand className="Title">Team 8 - HP</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/" data-navigo className="ViewOrders">View Orders</Nav.Link>
      <Nav.Link href="/new" data-navigo className="NewOrders">New Order</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <Switch>
    <Route path="/">
      <ViewOrderPage />
    </Route>
    <Route path="/new">
      <NewOrderPage />
    </Route>
  </Switch>
</div>
    );
  }
}
