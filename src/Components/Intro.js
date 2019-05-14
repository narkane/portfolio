import React, { Component } from "react";
import introMp4 from "../video/synthwave.mp4";
import { findDOMNode } from "react-dom";

class Intro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visibility,
      removeOnce: false
    };

    this.fade = this.fade.bind(this);
  }

  fade(nextProps) {
    console.log("FADE OUT: " + nextProps.visibility);
    this.setState({ visible: nextProps.visibility });
    // console.log("props.visible: " + !this.props.visible);
    // if (nextProps.visible !== this.props.visible) {
    //   console.log("not equal flag");
    //   this.myVideo = document.getElementById("intro");
    //   if (nextProps.visible) {
    //     console.log("fading in...");
    //     findDOMNode(this)
    //       .stop(true, true)
    //       .fadeIn("slow");
    //   } else {
    //     console.log("fading out...");
    //     this.myVideo.stop(true, true).fadeOut("slow");
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.fade(nextProps);
  }

  componentDidMount() {
    console.log(this.state.visible);
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
          transition: "opacity 1.5s ease-in 1s"
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
// Intro video component

// class Intro extends Component {
//   constructor(props) {
//     //pass in props
//     super(props);

//     this.state = {
//       intro: 0
//     };
//   }

//   componentDidMount() {
//     this.myVideo = document.getElementById("video");
//     // this.myVideo.autoPlay = true;
//     // this.myVideo.load();
//     this.myVideo.ontimeupdate = () => {
//       if (this.myVideo.currentTime >= 2 && this.state.intro === 0) {
//         //   this.setState({ intro: 1 });
//       }
//       if (this.myVideo.currentTime >= 8) {
//         this.setState({ intro: 2 });
//         // this.myVideo = document.getElementById("video");
//         // this.myVideo.parentNode.removeChild(this.myVideo);
//         this.myVideo.pause();
//         // if (document.getElementsByClassName("nav")[0]) {
//         // }
//       }
//     };
//   }

// render() {
//   return (
//     <div
//       className="intro"
//       onClick={() => {
//         this.setState({ intro: true });
//       }}
//     >
//       <video
//         id="video"
//         height="80%"
//         width="50%"
//         autoPlay
//         muted
//         className="vid"
//       >
//         <source src={introMp4} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

//}
