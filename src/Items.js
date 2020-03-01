import React from 'react';
import {NavLink} from "react-router-dom";

function Item(props) {
  return <div className="col-sm-12 col-md-6 col-lg-4 col-xl-2 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.data.name}</h5>
        <NavLink to={`/item/${props.data.id}/buy`} className="card-link">Buy</NavLink>
      </div>
    </div>
  </div>
}

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    let resp = await fetch("/api/v1/items");
    if (resp.ok) {
      let data = await resp.json();
      this.setState({items: data});
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.items.map((item, idx) =>
          <Item key={idx} data={item}/>)}
      </div>
    )
  }
}

export default Items;
