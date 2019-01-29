import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

// var logged = false;

class webMethods extends Component {
  toggleAdmin = () => {
    const { isAdmin } = this.state;
    //this.setState({ isAdmin: !isAdmin });
    return !isAdmin;
  };
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(webMethods);
