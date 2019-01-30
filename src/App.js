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

import introMp4 from "./video/synthwave.mp4";
import NewsCard from "./Components/NewsCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      intro: 0
    };
    this.updateUser = this.updateUser.bind(this);
    this.getDPTeams = this.getDPTeams.bind(this);
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
    // this.myAudio.load();
    // this.myAudio.onloadeddata = () => {
    //   this.myAudio.play().catch(e => {
    //     console.log(e);
    //   });
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

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        {this.state.intro == 0 ? (
          <div
            className="intro"
            onClick={() => {
              this.setState({ intro: true });
            }}
          >
            <video id="video" height="50%" width="50%" autoPlay muted>
              <source src={introMp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : this.state.intro == 1 ? (
          <>
            <div className="introFade">
              <video id="video" height="50%" width="50%" autoPlay muted>
                <source src={introMp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <Header user={user} updateUser={this.updateUser} className="nav" />
            <ParticlesContainer />
            {/* <Container user={user} className="body" />
            </ParticlesContainer> */}
            {/* <script>{this.myAudio.play()}</script> */}
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
              </Rnd>
            ) : null}
            <Header
              listDP={this.getDPTeams}
              user={user}
              updateUser={this.updateUser}
              className="nav"
            />

            <ParticlesContainer />
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
        )}
      </div>
    );
  }
}

export default App;
