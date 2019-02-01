import React, { Component } from "react";
import Particles from "react-particles-js";

class ParticlesContainer extends Component {
  render() {
    return (
      <div className="particles">
        <Particles
          params={{
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#f77"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 1,
                  color: "#fa6"
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
                value: 0.6,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.05,
                  sync: false
                }
              },
              size: {
                value: 4,
                random: true,
                anim: {
                  enable: true,
                  speed: 10,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 250,
                color: "#f22",
                opacity: 0.7,
                width: 1
              },
              move: {
                enable: true,
                speed: 1,
                direction: "right",
                random: true,
                straight: false,
                out_mode: "out",
                attract: {
                  enable: true,
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
                    // width: 10,
                    opacity: 1
                  }
                },
                bubble: {
                  // color: "#000",
                  distance: 200,
                  size: 6,
                  duration: 0.25,
                  opacity: 0.85,
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
      </div>
    );
  }
}

export default ParticlesContainer;
