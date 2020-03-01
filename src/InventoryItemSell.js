import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import fetchWithAuth from "./Utils";

class InventoryItemSellForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItem: {
        item: {name: ''},
        count: 0
      },
      count: '',
      price: ''
    }
  }

  async componentDidMount() {
    let resp = await fetchWithAuth(`/api/v1/inventory/${this.props.inventoryItemId}`)
    if (resp.ok) {
      let data = await resp.json();
      this.setState({inventoryItem: data});
    }
  }

  update(field, e) {
    this.setState({[field]: e.target.value});
  }

  async sell(e) {
    e.preventDefault();
    let resp = await fetchWithAuth(`/api/v1/inventory/${this.props.inventoryItemId}/sell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: this.state.count, price: this.state.price})
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
        <div className="row">
          <div className="col">
            {this.state.errors ?
                <div className="alert alert-danger" role="alert">{this.state.errors}</div> : <span/>}
            <p>You have {this.state.inventoryItem.count} of {this.state.inventoryItem.item.name}</p>
            <form onSubmit={(e) => this.sell(e)}>
              <div className="form-group">
                <label htmlFor="count">Count</label>
                <input type="number" placeholder="Count" id="count" className="form-control" value={this.state.count}
                       onChange={(e) => this.update('count', e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="count">Price</label>
                <input type="number" placeholder="Price" id="price" className="form-control" value={this.state.price}
                       onChange={(e) => this.update('price', e)}/>
              </div>
              <input type="submit" className="btn btn-primary"
                     disabled={!(this.state.count && this.state.price)}
                     value="Sell"/>
            </form>
          </div>
        </div>
    )
  }
}

function InventoryItemSell() {
  let {inventoryItemId} = useParams();
  let history = useHistory();
  return <InventoryItemSellForm inventoryItemId={inventoryItemId} history={history}/>
}

export default InventoryItemSell;
