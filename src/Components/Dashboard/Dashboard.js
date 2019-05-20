import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateLoggedIn } from "../../ducks/reducer";

import BurgerBox from "../BurgerBox/BurgerBox";
import LoginArea from "../LoginArea/LoginArea";

// import webMethods from "../../Methods/webMethods";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //this.change_name = this.change_name.bind(this);
    // webMethods = new webMethods();
    // const { updateLoggedIn } = this.props;
    axios.defaults.withCredentials = true;
  }

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  render() {
    return (
      <div className="Dashboard">
        {/* <div className="title">Software Development</div> */}
        {this.props.loggedIn ? (
          <BurgerBox showDP={this.props.showDP} />
        ) : (
          <LoginArea />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { loggedIn } = state;

  return { loggedIn: state.loggedIn };
}

export default connect(
  mapStateToProps,
  { updateLoggedIn }
)(Dashboard);
