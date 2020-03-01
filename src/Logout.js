import React from 'react';
import {Redirect} from "react-router-dom";

function Logout(props) {
  props.onLogout();
  return <Redirect to="/" />;
}

export default Logout;
