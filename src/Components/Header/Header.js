import React, { Component } from "react";
import axios from "axios";
import NewsCard from "../NewsCard";
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
    this.change_name = this.change_name.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidUpdate() {
    if (document.getElementById("change_name_input")) {
      const input = document.getElementById("change_name_input");
      input.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
          console.log(input.value);
          axios
            .put("/auth/change_name", { username: input.value })
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
    const { user } = this.props;
    return (
      <div className="Header">
        <div className="title">Software Development</div>
        {this.state.loggedIn ? (
          <>
            <div className="welcomeMessage" />
            {/* <button onClick={this.logout}>Logout</button> */}

            <div className="burgerbox" onClick={this.toggleBurg}>
              &#9776;
            </div>

            {this.state.burger ? (
              <div className="dropDown">
                <div className="tabs">
                  <button className="dropButt" onClick={this.props.listDP}>
                    Devpool List
                  </button>
                  <button className="dropButt">Teacherpool List</button>
                  <button className="dropButt" onClick={this.deleteUser}>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.handlePasswordInput(e.target.value)}
                />
              </div>
              <button onClick={this.login} id="log">
                Log In
              </button>
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
