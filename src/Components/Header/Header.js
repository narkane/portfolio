import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateLoggedIn } from "../../ducks/reducer";
import webMethods from "../../Methods/webMethods";
import NewsCard from "../NewsCard";
import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAdmin: false,

      burger: false
    };
    this.toggleBurg = this.toggleBurg.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    //this.change_name = this.change_name.bind(this);
    // webMethods = new webMethods();
    // const { updateLoggedIn } = this.props;
  }

  login = (u, p) => {
    const { updateLoggedIn } = this.props;

    axios
      .post("http://sdc.thummel.site:3004/login", {
        username: u,
        password: p
      })
      .then(resp => {
        console.log("resp.data: " + JSON.stringify(resp.data));
        if (resp.status === 200) {
          console.log(resp.status.json);
          console.log(JSON.stringify(resp.status.json));
          //this.setState({ loggedIn: true });
          console.log("yo");
          updateLoggedIn(true);
        } else {
          // console.log(resp.status);
          console.log("no");
          updateLoggedIn(false);
        }
        // return logged;
        if (document.getElementById("shadow")) {
          document.getElementById("shadow").remove();
        }
      });
    // console.log("LOGGED?: " + this.props.loggedIn);
  };

  register = (u, p) => {
    axios
      .post("http://sdc.thummel.site:3004/register", {
        username: u,
        password: p
      })
      .then(resp => {
        console.log(resp);
      });
  };

  logout = () => {
    const { updateLoggedIn } = this.props;

    axios.get("http://sdc.thummel.site:3004/logout").then(resp => {
      alert(resp.data);
      console.log(resp);
      if (resp.status == 200) {
        //this.setState({ loggedIn: false });
        updateLoggedIn(false);
      }
    });
    // return logged;
  };

  deleteUser = (u, p) => {
    const { updateLoggedIn } = this.props;
    axios
      .delete("http://sdc.thummel.site:3004/delete", {
        username: u,
        password: p
      })
      .then(resp => {
        console.log("deleting");
        console.log(resp.status + ": " + JSON.stringify(resp.data));
        if (resp.status == 200) {
          //this.setState({ loggedIn: false });
          updateLoggedIn(false);
        }
      });
    // return logged;
  };

  componentDidMount = () => {
    //this.login("", "");
  };

  componentDidUpdate() {
    if (document.getElementById("change_name_input")) {
      const input = document.getElementById("change_name_input");
      input.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
          console.log(input.value);
          axios
            .put("http://sdc.thummel.site:3004/change_name", {
              username: input.value
            })
            .then(resp => {
              console.log(resp);
              if ((resp.status = 200)) {
                console.log("YAY new name!");
              }
            });
        }
      });
    }
  }

  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }

  toggleBurg = () => {
    this.setState({ burger: !this.state.burger });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="Header">
        <div className="title">Software Development</div>
        {this.props.loggedIn ? (
          <>
            <div className="welcomeMessage" />
            {/* <button onClick={this.logout}>Logout</button> */}

            <div className="burgerbox" onClick={this.toggleBurg}>
              &#9776;
            </div>

            {this.state.burger ? (
              <div className="dropDown">
                <div className="tabs">
                  <button className="dropButt" onClick={this.props.showDP}>
                    Devpool List
                  </button>
                  <button className="dropButt">Teacherpool List</button>
                  <button
                    className="dropButt"
                    onClick={this.deleteUser(
                      this.state.username,
                      this.state.password
                    )}
                  >
                    Delete Acct.
                  </button>
                  <button className="dropButt" onClick={this.logout}>
                    Logout
                  </button>
                </div>
                <NewsCard />
                {/* </NewsCard> */}
                {/* <div width="400" height="400" />; */}
              </div>
            ) : null}
          </>
        ) : (
          <div className="nav">
            <div className="loginContainer">
              <div className="login">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => this.handleUsernameInput(e.target.value)}
                />
                <input
                  id="passin"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.handlePasswordInput(e.target.value)}
                />
              </div>
              {/* </div> */}
              <button
                onClick={() => {
                  this.login(this.state.username, this.state.password);
                }}
                id="log"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  this.register(this.state.username, this.state.password);
                }}
                id="reg"
              >
                Register
              </button>
            </div>
          </div>
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
)(Header);
