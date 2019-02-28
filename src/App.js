import React, { Component } from "react";
import { Rnd } from "react-rnd";
import ReactTooltip from "react-tooltip";
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

import dpAPI from "./devpoolHandler.js";
// const dp = require("./devpoolHandler.js").default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      intro: 0
      // devpool: []
    };
    // this.openFullscreen = this.openFullscreen.bind(this);
    // this.joinTeam = this.joinTeam.bind(this);
    // this.createTeam = this.createTeam.bind(this);
    this.startMusic = this.startMusic.bind(this);
    // this.updateUser = this.updateUser.bind(this);
    // this.showDPTeams = this.showDPTeams.bind(this);
    // this.getDPTeams = this.getDPTeams.bind(this);
    // this.organizeDP = this.organizeDP.bind(this);
    // this.listTeamMembers = this.listTeamMembers.bind(this);
    // this.forceUpdate = this.forceUpdate.bind(this);
    this.dp = new dpAPI(this);
  }

  componentDidMount = () => {
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
      if (this.myVideo.currentTime >= 2) {
        this.setState({ intro: 1 });
      }
      if (this.myVideo.currentTime >= 5.5) {
        this.myVideo.pause();
        this.setState({ intro: 2 });
      }
    };
  };

  startMusic() {
    if (document.getElementById("shadow")) {
      document.getElementById("shadow").remove();

      this.dp.openFullscreen();

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

  componentDidUpdate() {
    // componentDidMount() {
    this.dp.teamInspectSelector();
  }

  render() {
    console.log(this.dp.state.devpool);
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
            <Header updateUser={this.dp.updateUser} className="nav" />
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
            {this.dp.state.devpool ? (
              <Rnd
                default={{
                  x: 20,
                  y: 20,
                  height: 360,
                  width: 640
                }}
                className="devpool"
              >
                {!this.dp.state.teamSelect && this.dp.state.ranInspect && (
                  <ReactTooltip
                    type="dark"
                    place="right"
                    effect="float"
                    id="dp-inspect-tip"
                  >
                    <div fontWeight="700">
                      members
                      <hr />
                      {this.dp.state.membersInSelectedTeamInspect &&
                        this.dp.state.membersInSelectedTeamInspect}
                      {/* {this.teamInspectSelector()} */}
                      {/* {console.log(this.teamInspectSelector())} */}
                    </div>
                  </ReactTooltip>
                )}

                <div class="dp-controls">
                  <a className="dp-add" data-tip data-for="dp-create-tip">
                    <button className="dp-add" onClick={this.dp.createTeam}>
                      +
                    </button>
                  </a>

                  <ReactTooltip
                    place="top"
                    type="warning"
                    effect="solid"
                    id="dp-create-tip"
                  >
                    <div style={{ color: "black" }} fontWeight="700">
                      Add new Team
                      <br />
                      (FEATURE UNDER CONSTRUCTION)
                    </div>
                  </ReactTooltip>

                  <button class="dp-join" onClick={this.dp.joinTeam}>
                    Join
                  </button>
                  <button
                    class="dp-close"
                    onClick={() => {
                      this.dp.setState({ devpool: 0 });
                    }}
                  >
                    x
                  </button>
                </div>
                {this.dp.organizeDP()}
                {/* {this.createTeam} */}
                <img src={window} id="dp-window" draggable="false " />
              </Rnd>
            ) : (
              this.dp.state.ranInspect &&
              this.dp.setState({ ranInspect: false })
            )}
            <Header
              showDP={this.dp.showDPTeams}
              updateUser={this.dp.updateUser}
              className="nav"
            />

            <div id="skyline" />
            <ParticlesContainer />
            <div id="shadow" />
            {/* <div className="corner" /> */}
            <div className="scene" onClick={this.dp.openFullscreen}>
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
