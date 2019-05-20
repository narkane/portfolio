import React, { Component } from "react";
import axios from "axios";
import NewsCard from "../NewsCard";

class BurgerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      burger: false
    };
    this.toggleBurg = this.toggleBurg.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
      <>
        <div className="welcomeMessage" />
        {/* <button onClick={this.logout}>Logout</button> */}
        <div className="burgerbox" onClick={this.toggleBurg}>
          &#9776;
        </div>
        {this.state.burger && (
          <div className="dropDown">
            <div className="tabs">
              <button
                className="dropButt"
                onClick={console.log("props: " + this.props.showDP)}
              >
                Devpool List
              </button>
              <button className="dropButt">Teacherpool List</button>
              <button
                className="dropButt"
                onClick={() => {
                  this.deleteUser(this.state.username, this.state.password);
                }}
              >
                Delete Acct.
              </button>
              <button className="dropButt" onClick={this.logout}>
                Logout
              </button>
            </div>
            <NewsCard />
          </div>
        )}
      </>
    );
  }
}

export default BurgerBox;
