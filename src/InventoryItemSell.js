import React from 'react';
import {
  useParams,
  useHistory
} from "react-router-dom";
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
    this.setState({ [field]: e.target.value });
  }

  async sell() {
    let resp = await fetchWithAuth(`/api/v1/inventory/${this.props.inventoryItemId}/sell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: this.state.count, price: this.state.price})
    });
    if (resp.ok) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
        <div className="row">
          <div className="col">
            <p>You have {this.state.inventoryItem.count} of {this.state.inventoryItem.item.name}</p>
            <div className="form-group">
              <input type="number" placeholder="Count" className="form-control" value={this.state.count}
                     onChange={(e) => this.update('count', e)} />
            </div>
            <div className="form-group">
              <input type="number" placeholder="Price" className="form-control" value={this.state.price}
                     onChange={(e) => this.update('price', e)} />
            </div>
            <button className="btn btn-primary"
                    disabled={!(this.state.count && this.state.price)}
                    onClick={() => this.sell()}>Sell</button>
          </div>
        </div>
    )
  }
}

function InventoryItemSell() {
  let { inventoryItemId } = useParams();
  let history = useHistory();
  return <InventoryItemSellForm inventoryItemId={inventoryItemId} history={history} />
}

export default InventoryItemSell;
