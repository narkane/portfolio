import React, { Component } from "react";
import ReactDOM from "react-dom";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import { Rnd } from "react-rnd";
import ReactTooltip from "react-tooltip";
import "./App.css";
// import "./Components/Header/Header.css";
import "./Components/ParticleJS/ParticlesContainer.css";
import music from "./audio/synthetic.mp3";
import Header from "./Components/Header/Header";
import Intro from "./Components/Intro";
import ParticlesContainer from "./Components/ParticleJS/ParticlesContainer";

import cur_b from "./img/cursor_b.png";
import logo from "./img/dms.png";
import logo_s from "./img/dms_s.png";
import logo_t from "./img/dms_t.png";
import logo_b from "./img/dms_b.png";
import windowdp from "./img/window.png";

import NewsCard from "./Components/NewsCard";

import dpAPI from "./devpoolHandler.js";
import { timeout } from "q";
// const dp = require("./devpoolHandler.js").default;

class App extends Component {
  constructor() {
    super();

    this.state = {
      intro: 1,
      bounceHeader: false
    };
    this.startMusic = this.startMusic.bind(this);
    this.loaded = this.loaded.bind(this);
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

    window.addEventListener("load", this.loaded);

    document.addEventListener("click", this.startMusic);

    // setTimeout(() => {
    // this.setState({ intro: 0 });
    // }, 4500);
  };

  startMusic() {
    this.loaded();

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

  componentDidUpdate() {
    this.dp.teamInspectSelector();
  }

  loaded() {
    if (this.state.intro !== 0) {
      this.setState({ intro: 0 });
      setTimeout(() => {
        this.setState({ bounceHeader: true });
      }, 2000);
    }
  }

  render() {
    return (
      <div
        className="App"
        id="App"
        // onLoad={this.loaded}
        // onError={() => {
        //   alert("ERROR LOADING!");
        //   window.location.reload(true);
        // }}
      >
        <Intro visibility={this.state.intro} />

        {this.state.bounceHeader && (
          // setTimeout(
          <Zoom bottom id="bounceLogin">
            <Header
              showDP={this.dp.showDPTeams}
              updateUser={this.dp.updateUser}
              className="nav"
            />
          </Zoom>
        )}

        {this.dp.state.devpool ? (
          <Rnd
            default={{
              x: 100,
              y: 100,
              height: 240,
              width: 640
            }}
            enableResizing="false"
            className="devpool"
          >
            {this.dp.state.ranInspect && (
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
                </div>
              </ReactTooltip>
            )}

            <Bounce bottom>
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
              <img src={windowdp} id="dp-window" draggable="false " />
            </Bounce>
          </Rnd>
        ) : (
          this.dp.state.ranInspect &&
          function() {
            this.dp.setState({ ranInspect: false });
          }
        )}

        <div className="title">Software Development</div>
        <div id="skyline" />
        {/* <ParticlesContainer /> */}
        {/* <div id="shadow" /> */}
        {/* <div id="static" /> */}
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
      </div>
    );
  }
}

export default App;
