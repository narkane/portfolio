import React, { Component } from "react";
import axios from "axios";
import "./Header.css";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      loggedIn: false,

      burger: false
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }

  toggleAdmin() {
    const { isAdmin } = this.state;
    this.setState({ isAdmin: !isAdmin });
  }

  login() {
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(resp => {
        console.log(resp);
        if ((resp.status = 200)) {
          this.setState({ loggedIn: true });
        }
      });
    // axios POST to /auth/login here
  }

  register() {
    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(resp => {
        console.log(resp);
      });
    // axios POST to /auth/register here
  }

  logout() {
    axios.get("/auth/logout").then(resp => {
      console.log(resp);
      if ((resp.status = 200)) {
        this.setState({ loggedIn: false });
      }
    });
    // axios GET to /auth/logout here
  }

  toggleBurg = () => {
    this.setState({ burger: !this.state.burger });
  };

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    return (
      <div className="Header">
        <div className="title">Software Development</div>
        {this.state.loggedIn ? (
          <div className="welcomeMessage">
            {/* <button type="submit" onClick={this.logout}>
              Logout
            </button> */}

            <div className="burgerbox" onClick={this.toggleBurg}>
              {" "}
              &#9776;
            </div>

            {this.state.burger ? (
              <div className="dropDown">
                <hr />
                <div className="currUser">{username}</div>

                <div className="dropBot">
                  DROP DOOOO~OOOOWN
                  <hr />
                </div>
              </div>
            ) : null}
          </div>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.handlePasswordInput(e.target.value)}
                />
              </div>
              {/* <div className="adminCheck">
              <input
                type="checkbox"
                id="adminCheckbox"
                onChange={() => this.toggleAdmin()}
              />{" "}
              <span> Admin </span>
            </div> */}

              <button onClick={this.login}>Log In</button>
              <button onClick={this.register} id="reg">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
