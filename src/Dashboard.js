import React from 'react';
import fetchWithAuth from "./Utils";
import {NavLink} from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      wallet: {coins: 0},
      buyListings: [],
      sellListings: [],
      inventory: [],
    }
  }

  async componentDidMount() {
    let resp = await fetchWithAuth("/api/v1/dashboard");
    if (resp.ok) {
      let data = await resp.json();
      this.setState({
        user: data.user,
        wallet: data.wallet,
        buyListings: data.buyListings,
        sellListings: data.sellListings,
        inventory: data.inventory,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h3>Welcome <strong>{this.state.user}</strong></h3>
            <p>You have <strong>{this.state.wallet.coins}</strong> coins</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <h3>Your buy listings</h3>
            <ul>
              {this.state.buyListings.map((listing, idx) =>
                <li key={idx}>{listing.description}</li>)}
            </ul>
          </div>
          <div className="col-3">
            <h3>Your sell listings</h3>
            <ul>
              {this.state.sellListings.map((listing, idx) =>
                <li key={idx}>{listing.description}</li>)}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Inventory</h3>
            <ul>
              {this.state.inventory.map((inventoryItem, idx) =>
                <li key={idx}>{inventoryItem.description} <NavLink to={`/inventory/${inventoryItem.id}/sell`}>Sell</NavLink></li>)}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
