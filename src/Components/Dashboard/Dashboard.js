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
    this.state = {
      burger: false
    };

    this.toggleBurg = this.toggleBurg.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    //this.change_name = this.change_name.bind(this);
    // webMethods = new webMethods();
    // const { updateLoggedIn } = this.props;
    axios.defaults.withCredentials = true;
  }

  logout = () => {
    const { updateLoggedIn } = this.props;

    axios.get("http://sdc.thummel.site:3004/logout").then(resp => {
      console.log(resp);
      if (resp.status === 200) {
        console.log("loggin out");
        //this.setState({ loggedIn: false });
        updateLoggedIn(false);
      }
    });
    // return logged;
  };

  deleteUser = (u, p) => {
    const { updateLoggedIn } = this.props;
    axios
      .post("http://sdc.thummel.site:3004/delete", {
        username: u,
        password: p
      })
      .then(resp => {
        console.log(resp.status + ": " + JSON.stringify(resp.data));
        if (resp.status === 200) {
          console.log("deleting");
          //this.setState({ loggedIn: false });
          updateLoggedIn(false);
        }
      })
      .catch(e => {
        console.log("ERROR: " + e);
      });
    // return logged;
  };

  toggleBurg = () => {
    this.setState({ burger: !this.state.burger });
  };

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  render() {
    return (
      <div className="Dashboard">
        {/* <div className="title">Software Development</div> */}
        {this.props.loggedIn ? <BurgerBox /> : <LoginArea />}
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
