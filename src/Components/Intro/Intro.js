import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import introMp4 from "../../video/footagecrate-go-style1.mp4"; //../video/synthwave.mp4";
import swipeMp3 from "../../audio/slice.mp3";

class Intro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visibility,
      removeOnce: false
    };
    // this.audio = new Audio(swipeMp3);

    this.playMp3Twice = this.playMp3Twice.bind(this);
    this.fade = this.fade.bind(this);
  }

  playMp3Twice = () => {
    function play() {
      var audio = new Audio(swipeMp3);
      audio.setAttribute("playbackRate", 1.1);
      audio.play();
    }
    play();
    setTimeout(play, 500);
  };

  fade(nextProps) {
    console.log("FADE OUT: " + nextProps.visibility);
    this.setState({ visible: nextProps.visibility });
  }

  componentWillReceiveProps(nextProps) {
    this.fade(nextProps);
  }

  componentDidMount() {
    console.log(this.state.visible);
    this.video = document.getElementById("video");
    this.video.addEventListener(
      "loadeddata",
      () => {
        // Video is loaded and can be played
        this.playMp3Twice();
      },
      false
    );

    // var fauxprops = { visibility: 0 };
    // this.fade(fauxprops);
    // this.forceUpdate();
  }

  componentWillUpdate() {
    console.log("removeonce: " + this.state.removeOnce);
    if (this.state.visible === 0 && !this.state.removeOnce) {
      this.loadarea = document.getElementsByClassName("intro")[0];
      console.log(this.loadarea);
      // this.loadarea = this.loadarea[0];

      setTimeout(() => {
        if (!this.state.removeOnce) {
          this.loadarea.parentNode.removeChild(this.loadarea);
          this.setState({ removeOnce: true });
        }
      }, 1500);
    }
  }

  render() {
    return (
      <div
        style={{
          opacity: this.state.visible,
          transition: "opacity 1.5s ease-in"
        }}
        className="intro"
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
    );
  }
}

export default Intro;
