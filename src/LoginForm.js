import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  update(field, e) {
    this.setState({ [field]: e.target.value });
  }

  async login() {
    let resp = await fetch('/api-auth-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    });
    if (resp.ok) {
      let data = await resp.json();
      this.props.onTokenReceive(data.token);
    }
  }

  render() {
      return <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <input className="form-control" type="text" placeholder="User name" value={this.state.username}
                     onChange={(e) => this.update('username', e)} />
            </div>
            <div className="form-group">
              <input className="form-control" type="password" placeholder="Password" value={this.state.password}
                     onChange={(e) => this.update('password', e)} />
            </div>
            <button className="btn btn-primary" onClick={() => this.login()}>Log in</button>
          </div>
        </div>
      </div>;
  }
}

export default LoginForm;
