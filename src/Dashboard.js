import React from 'react';
import fetchWithAuth from "./Utils";
import {NavLink} from "react-router-dom";
import {Listings} from "./Listings";

function Inventory(props) {
  return <div className="col-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Inventory</h5>
      </div>
      <ul className="list-group list-group-flush">
        {props.inventory.map((inventoryItem, idx) =>
            <li className="list-group-item" key={idx}>
              <span>{inventoryItem.description} </span>
              <NavLink to={`/inventory/${inventoryItem.id}/sell`}
                       className="btn btn-link btn-sm">Sell</NavLink>
              <NavLink to={`/item/${inventoryItem.item.id}/buy`}
                       className="btn btn-link btn-sm">Buy more</NavLink>
            </li>)}
      </ul>
    </div>
  </div>
}

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
          <div className="row mb-3">
            <Listings title="Your buy listings" listings={this.state.buyListings}/>
            <Listings title="Your sell listings" listings={this.state.sellListings}/>
          </div>
          <div className="row">
            <Inventory inventory={this.state.inventory} />
          </div>
        </React.Fragment>
    );
  }
}

export default Dashboard;
