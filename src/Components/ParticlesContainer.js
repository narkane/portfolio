import React, { Component } from "react";
import Particles from "react-particles-js";

import logo from "../img/dms.png";

class ParticlesContainer extends Component {
  render() {
    return (
      <div>
        <Particles
          params={{
            //   particles: {
            //     number: {
            //       value: 150,
            //       density: {
            //         enable: true,
            //         value_area: 1803.4120608655228
            //       }
            //     },
            //     color: {
            //       value: "#ffffff"
            //     },
            //     shape: {
            //       type: "circle",
            //       stroke: {
            //         width: 2,
            //         color: "#000000"
            //       },
            //       polygon: {
            //         nb_sides: 4
            //       },
            //       image: {
            //         src: "img/github.svg",
            //         width: 100,
            //         height: 100
            //       }
            //     },
            //     opacity: {
            //       value: 0.4008530152163807,
            //       random: false,
            //       anim: {
            //         enable: false,
            //         speed: 1,
            //         opacity_min: 0.1,
            //         sync: false
            //       }
            //     },
            //     size: {
            //       value: 1.5,
            //       random: true,
            //       anim: {
            //         enable: false,
            //         speed: 40,
            //         size_min: 0.1,
            //         sync: false
            //       }
            //     },
            //     line_linked: {
            //       enable: true,
            //       distance: 0,
            //       color: "#ffffff",
            //       opacity: 0.3687847739990702,
            //       width: 0.6413648243462091
            //     },
            //     move: {
            //       enable: true,
            //       speed: 6,
            //       direction: "none",
            //       random: false,
            //       straight: false,
            //       out_mode: "out",
            //       bounce: false,
            //       attract: {
            //         enable: false,
            //         rotateX: 600,
            //         rotateY: 1200
            //       }
            //     }
            //   },
            //   interactivity: {
            //     detect_on: "window",
            //     events: {
            //       onhover: {
            //         enable: true,
            //         mode: "repulse"
            //       },
            //       onclick: {
            //         enable: false,
            //         mode: "bubble"
            //       },
            //       resize: true
            //     },
            //     modes: {
            //       grab: {
            //         distance: 400,
            //         line_linked: {
            //           opacity: 1
            //         }
            //       },
            //       bubble: {
            //         distance: 400,
            //         size: 40,
            //         duration: 2,
            //         opacity: 8,
            //         speed: 3
            //       },
            //       repulse: {
            //         distance: 100,
            //         duration: 0.4
            //       },
            //       push: {
            //         particles_nb: 4
            //       },
            //       remove: {
            //         particles_nb: 2
            //       }
            //     }
            //   },
            //   retina_detect: true
            // }
            particles: {
              number: {
                value: 90,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0.75,
                  color: "#cc3333"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.005,
                random: false,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.001,
                  sync: false
                }
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: false,
                  speed: 10,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 250,
                color: "#ff7777",
                opacity: 0.2,
                width: 1
              },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "window",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "bubble"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 200,
                  size: 3,
                  duration: 0.2,
                  opacity: 0.7,
                  speed: 20
                },
                repulse: {
                  distance: 300
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true,
            config_demo: {
              hide_card: false,
              background_color: "#000000",
              background_image: "",
              background_position: "50% 50%",
              background_repeat: "no-repeat",
              background_size: "cover"
            }
          }}
        />
        <div className="corner" />
        <img src={logo} />
        <div className="top" />
        <div className="left" />
      </div>
    );
  }
}

export default ParticlesContainer;
