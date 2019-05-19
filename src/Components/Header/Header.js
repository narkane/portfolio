import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { updateLoggedIn } from "../../ducks/reducer";

import BurgerBox from "../BurgerBox/BurgerBox";

// import webMethods from "../../Methods/webMethods";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

import clickMp3 from "../../audio/click.mp3";
import submitMp3 from "../../audio/ask.mp3";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      //id only exists in session
      //id: 0,
      isAdmin: false,

      burger: false
    };

    this.clickA = new Audio(clickMp3);
    this.submitA = new Audio(submitMp3);
    this.quickAudio = this.quickAudio.bind(this);

    this.toggleBurg = this.toggleBurg.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    //this.change_name = this.change_name.bind(this);
    // webMethods = new webMethods();
    // const { updateLoggedIn } = this.props;
    axios.defaults.withCredentials = true;
  }

  quickAudio = sound => {
    if (!sound.paused) {
      sound.pause();
    }
    sound.currentTime = 0;
    sound.play();
  };

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
          console.log(resp.status);
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
        if (resp.status === 201) {
          toast.success(
            "Successfully registered: " + JSON.stringify(resp.data),
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            }
          );
          console.log(resp.status);

          //now login using blank user:pass
          //which is login flag for using cookies
          this.login("", "");
        }
        console.log(JSON.stringify(resp.data));
      });
  };

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

  componentWillMount = () => {
    this.login("", "");
  };

  componentDidMount = () => {
    // axios.get("http://sdc.thummel.site:3004/").then(resp => {
    //   console.log(resp);
    // });
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
              if (resp.status === 200) {
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
        <ToastContainer style={{ color: "black", fontWeight: 700 }} />
        {/* <div className="title">Software Development</div> */}
        {this.props.loggedIn ? (
          <BurgerBox />
        ) : (
          <div className="nav">
            <div className="loginContainer">
              <div className="login">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => {
                    this.quickAudio(this.clickA);
                    this.handleUsernameInput(e.target.value);
                  }}
                  onKeyDown={async event => {
                    if (event.keyCode === 13) {
                      this.quickAudio(this.submitA);
                      this.login(this.state.username, this.state.password);
                    }
                  }}
                />
                <input
                  id="passin"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => {
                    this.quickAudio(this.clickA);
                    this.handlePasswordInput(e.target.value);
                  }}
                  onKeyDown={async event => {
                    if (event.keyCode === 13) {
                      this.quickAudio(this.submitA);
                      this.login(this.state.username, this.state.password);
                    }
                  }}
                />
              </div>
              <button
                onClick={() => {
                  this.quickAudio(this.submitA);
                  this.login(this.state.username, this.state.password);
                }}
                id="log"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  this.quickAudio(this.submitA);
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
