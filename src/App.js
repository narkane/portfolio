import React, { Component } from "react";
import "./App.css";
import "./Components/ParticlesContainer.css";
import music from "./audio/synthetic.mp3";
import Header from "./Components/Header/Header";
// import Container from "./Components/Container/Container";
import ParticlesContainer from "./Components/ParticlesContainer";

import introMp4 from "./video/synthwave.mp4";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      intro: 0
    };
    this.updateUser = this.updateUser.bind(this);
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
    this.myAudio.play();

    this.myVideo = document.getElementById("video");
    this.myVideo.ontimeupdate = () => {
      console.log(this.myVideo.currentTime);
      if (this.myVideo.currentTime >= 1) this.setState({ intro: 1 });
      if (this.myVideo.currentTime >= 6) {
        this.myVideo.pause();
        this.setState({ intro: 2 });
      }
    };
  };

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
            <video
              id="video"
              height="50%"
              width="50%"
              autoPlay
              // onTimeUpdate={this.vidTimer(this)}
            >
              <source src={introMp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : this.state.intro == 1 ? (
          <>
            <div className="introFade">
              <video id="video" height="50%" width="50%" autoPlay>
                <source src={introMp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <Header user={user} updateUser={this.updateUser} className="nav" />
            <ParticlesContainer />
            {/* <Container user={user} className="body" />
            </ParticlesContainer> */}
          </>
        ) : (
          <>
            <Header user={user} updateUser={this.updateUser} className="nav" />
            <ParticlesContainer />
          </>
        )}
      </div>
    );
  }
}

export default App;
