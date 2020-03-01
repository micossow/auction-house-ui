import React from 'react';
import {Listings} from "./Listings";

class ItemListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyListings: [],
      sellListings: []
    }
  }

  async componentDidMount() {
    let resp = await fetch(`/api/v1/item/${this.props.itemId}/listings`);
    let data = await resp.json();
    this.setState(data);
  }

  render() {
    return (
        <>
          <Listings listings={this.state.buyListings} title="Buy listings" readonly />
          <Listings listings={this.state.sellListings} title="Sell listings" readonly />
        </>
    )
  }
}

export default ItemListings;
