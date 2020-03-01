import React from 'react';
import {NavLink} from "react-router-dom";

class AccountLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link" activeClassName="active">Log out</NavLink>
            </li>
        </ul>
    }
}

export default AccountLinks;
