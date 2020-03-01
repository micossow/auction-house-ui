import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Items from "./Items";
import Dashboard from "./Dashboard";
import InventoryItemSell from "./InventoryItemSell";
import LoginForm from "./LoginForm";
import fetchWithAuth from "./Utils";
import AccountLinks from "./AccountLinks";
import Logout from "./Logout";
import ItemBuy from "./ItemBuy";
import CancelListing from "./CancelListing";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      user: null
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.verifyAuth();
    }
  }

  async handleToken(token) {
    localStorage.setItem('token', token);
    await this.verifyAuth();
  }

  async handleLogout(token) {
    localStorage.setItem('token', null);
    this.setState({isAuth: false});
  }

  async verifyAuth() {
    let resp = await fetchWithAuth("/api/v1/dashboard");
    if (resp.ok) {
      let data = await resp.json();
      this.setState({isAuth: true, user: data.user});
    } else if (resp.status === 403) {
      this.setState({isAuth: false});
    }
  }

  render() {
    if (this.state.isAuth) {
      return (
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link" activeClassName="active">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/items" className="nav-link" activeClassName="active">Items</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <AccountLinks/>
              </ul>
            </div>
          </nav>

          <div className="container-fluid">
            <Switch>
              <Route path="/items">
                <Items/>
              </Route>
              <Route path="/item/:itemId/buy">
                <ItemBuy/>
              </Route>
              <Route path="/inventory/:inventoryItemId/sell">
                <InventoryItemSell/>
              </Route>
              <Route path="/listing/:listingId/cancel">
                <CancelListing/>
              </Route>
              <Route path="/logout">
                <Logout onLogout={() => this.handleLogout()}/>
              </Route>
              <Route path="/">
                <Dashboard/>
              </Route>
            </Switch>
          </div>
        </Router>
      );
    } else {
      return <LoginForm onTokenReceive={(token) => this.handleToken(token)}/>
    }
  }
}

export default App;
