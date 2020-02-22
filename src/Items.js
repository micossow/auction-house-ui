import React from 'react';

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
      <ul>
        {this.state.items.map((item, idx) =>
          <li key={idx}>{item.name}</li>)}
      </ul>
    )
  }
}

export default Items;
