import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { updateLoggedIn } from "../../ducks/reducer";

import clickMp3 from "../../audio/click.mp3";
import submitMp3 from "../../audio/ask.mp3";

import "react-toastify/dist/ReactToastify.css";

class LoginArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      //id only exists in session
      //id: 0,
      isAdmin: false
    };
    this.clickA = new Audio(clickMp3);
    this.submitA = new Audio(submitMp3);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.quickAudio = this.quickAudio.bind(this);

    axios.defaults.withCredentials = true;
  }

  quickAudio = sound => {
    if (!sound.paused) {
      sound.pause();
    }
    sound.currentTime = 0;
    sound.play();
  };

  ///////////
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

  ///////////
  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }
  ///////////

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

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  render() {
    return (
      <div className="nav">
        <ToastContainer style={{ color: "black", fontWeight: 700 }} />
        <div className="loginContainer">
          <div className="login">
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
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
              value={this.state.password}
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
)(LoginArea);
