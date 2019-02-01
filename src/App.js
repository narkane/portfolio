import React, { Component } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";
import "./App.css";
import "./Components/ParticleJS/ParticlesContainer.css";
import music from "./audio/synthetic.mp3";
import Header from "./Components/Header/Header";
import ParticlesContainer from "./Components/ParticleJS/ParticlesContainer";

import logo from "./img/dms.png";
import logo_s from "./img/dms_s.png";
import logo_t from "./img/dms_t.png";
import logo_b from "./img/dms_b.png";
import window from "./img/window.png";

import introMp4 from "./video/synthwave.mp4";
import NewsCard from "./Components/NewsCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      intro: 0
    };
    this.openFullscreen = this.openFullscreen.bind(this);
    this.joinTeam = this.joinTeam.bind(this);
    this.startMusic = this.startMusic.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getDPTeams = this.getDPTeams.bind(this);
  }

  componentDidMount = () => {
    // this.openFullscreen();

    this.myAudio = new Audio(music);
    this.myAudio.addEventListener(
      "ended",
      function() {
        this.currentTime = 0;
        this.play();
      },
      false
    );
    this.myAudio.load();
    // this.myAudio.onloadeddata = () => {

    document.addEventListener("click", this.startMusic);
    // };

    this.myVideo = document.getElementById("video");
    // this.myVideo.autoPlay = true;
    // this.myVideo.load();
    this.myVideo.ontimeupdate = () => {
      console.log(this.myVideo.currentTime);
      if (this.myVideo.currentTime >= 1) this.setState({ intro: 1 });
      if (this.myVideo.currentTime >= 4.5) {
        this.myVideo.pause();
        this.setState({ intro: 2 });
      }
    };
  };

  startMusic() {
    if (document.getElementById("shadow")) {
      document.getElementById("shadow").remove();

      this.openFullscreen();

      this.myAudio
        .play()
        .catch(e => {
          console.log(e);
          throw new Error("BOOP: " + e.message);
        })
        .catch(err => {
          console.log(err);
          console.log(err.message);
        });
    }
  }

  getDPTeams() {
    if (this.state.devpool) {
      this.setState({ devpool: null });
    } else {
      axios
        .get("/auth/devpool")
        .then(resp => {
          console.log(resp);
          if (resp.status == 200) {
            this.setState({ devpool: resp.data });
            console.log(this.state.devpool);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  updateUser(user) {
    this.setState({
      user
    });
  }

  joinTeam = () => {
    axios
      .post("/db/join_team", {
        team: "Nark's Team",
        desc: "New Database item about joining Narkane's wonderful team!!!"
      })
      .then(resp => {
        console.log(resp);
      });
    this.getDPTeams();
  };

  /* View in fullscreen */
  openFullscreen = () => {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.log(err + ": " + err.message);
      });
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen().catch(err => {
        console.log(err + ": " + err.message);
      });
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen().catch(err => {
        console.log(err + ": " + err.message);
      });
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen().catch(err => {
        console.log(err + ": " + err.message);
      });
    }
  };

  /* Close fullscreen */
  closeFullscreen = () => {
    var elem = document.documentElement;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.intro == 0 ? (
          <div
            className="intro"
            onClick={() => {
              this.setState({ intro: true });
            }}
          >
            <video
              id="video"
              height="50%"
              width="50%"
              autoPlay
              muted
              className="vid"
            >
              <source src={introMp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : this.state.intro == 1 ? (
          <>
            <div className="introFade">
              <video
                id="video"
                height="50%"
                width="50%"
                autoPlay
                muted
                className="vid"
              >
                <source src={introMp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <Header updateUser={this.updateUser} className="nav" />
            <div id="skyline" />
            <ParticlesContainer />
            <div id="shadow" />
            {/* <div className="corner" /> */}
            <div className="scene">
              <div className="cube">
                <img src={logo} className="front" />
                <img src={logo_s} className="side" />
                <img src={logo} className="back" />
                <img src={logo_s} className="side2" />
                <img src={logo_t} className="top_s" />
                <img src={logo_b} className="bot" />
              </div>
            </div>
          </>
        ) : (
          <>
            {this.state.devpool ? (
              <Rnd
                default={{
                  x: 20,
                  y: 20
                }}
                className="devpool"
              >
                <img src={window} id="dp-window" draggable="false " />
                {this.state.devpool.map(el => {
                  return (
                    <div
                      className="devpool-row"
                      style={{
                        background: `rgba(${(Math.pow(el.team_lead.length, 2) %
                          25) *
                          10}, ${(Math.pow(el.team_lead.length, 2) *
                          el.team_lead.charCodeAt(0)) %
                          256}, ${el.team_lead.length * 15}, 0.5`
                      }}
                    >
                      <div className="dev-header">
                        {/* <small> */}
                        <div id="dev-team">{`${el.team_name}`}</div>
                        {/* <div id="dev-mid" /> */}
                        <div id="dev-lead">{`[ ${el.team_lead} ]`}</div>
                        {/* </small> */}
                      </div>
                      <div id="dev-desc">
                        <ul>
                          <li>
                            <font size="1">{el.team_desc}</font>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
                <button onClick={this.joinTeam}>+</button>
              </Rnd>
            ) : null}
            <Header
              listDP={this.getDPTeams}
              updateUser={this.updateUser}
              className="nav"
            />

            <div id="skyline" />
            <ParticlesContainer />
            <div id="shadow" />
            {/* <div className="corner" /> */}
            <div className="scene" onClick={this.openFullscreen}>
              <div className="cube">
                <img src={logo} className="front" />
                <img src={logo_s} className="side" />
                <img src={logo} className="back" />
                <img src={logo_s} className="side2" />
                <img src={logo_t} className="top_s" />
                <img src={logo_b} className="bot" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
