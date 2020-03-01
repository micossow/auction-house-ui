import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import fetchWithAuth from "./Utils";
import ItemListings from "./ItemListings";

class ItemBuyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingCount: '',
      listingPrice: '',
      buyNowCount: '',
      errors: ''
    }
  }

  update(field, e) {
    this.setState({[field]: e.target.value});
  }

  async makeListing(e) {
    e.preventDefault();
    let resp = await fetchWithAuth(`/api/v1/item/${this.props.itemId}/create-listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: this.state.listingCount, price: this.state.listingPrice})
    });
    if (resp.ok) {
      this.props.history.push('/dashboard');
    } else {
      let data = await resp.json();
      this.setState({errors: data.error})
    }
  }

  async buyNow(e) {
    e.preventDefault();
    let resp = await fetchWithAuth(`/api/v1/item/${this.props.itemId}/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: this.state.buyNowCount})
    });
    if (resp.ok) {
      this.props.history.push('/dashboard');
    } else {
      let data = await resp.json();
      this.setState({errors: data.error})
    }
  }

  render() {
    return (
        <>
          <div className="row mb-3">
            {this.state.errors ?
                <div className="alert alert-danger" role="alert">{this.state.errors}</div> : <span/>}
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <h3>Make purchase listing</h3>
              <form onSubmit={(e) => this.makeListing(e)}>
                <div className="form-group">
                  <input type="number" placeholder="Count" className="form-control" value={this.state.listingCount}
                         onChange={(e) => this.update('listingCount', e)}/>
                </div>
                <div className="form-group">
                  <input type="number" placeholder="Price" className="form-control" value={this.state.listingPrice}
                         onChange={(e) => this.update('listingPrice', e)}/>
                </div>
                <input type="submit" className="btn btn-primary"
                       disabled={!(this.state.listingCount && this.state.listingPrice)}
                       value="Make listing">
                </input>
              </form>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <h3>Buy instantly</h3>
              <form onSubmit={(e) => this.buyNow(e)}>
                <div className="form-group">
                  <input type="number" placeholder="Count" className="form-control" value={this.state.buyNowCount}
                         onChange={(e) => this.update('buyNowCount', e)}/>
                </div>
                <input type="submit" className="btn btn-primary"
                       disabled={!this.state.buyNowCount}
                       value="Buy now"/>
              </form>
            </div>
          </div>
          <div className="row">
            <ItemListings itemId={this.props.itemId} />
          </div>
        </>
    )
  }
}

function ItemBuy() {
  let {itemId} = useParams();
  let history = useHistory();
  return <ItemBuyForm itemId={itemId} history={history}/>
}

export default ItemBuy;
