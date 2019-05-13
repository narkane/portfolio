import React from "react";
import axios from "axios";

import logo from "./img/dms.png";

var state = () => {
  return {
    devpool: 0,
    devpoolMembers: 0,
    teamSelect: 0,
    membersInSelectedTeamInspect: 0,
    ranInspect: 0
  };
};

class dpAPI {
  constructor(that) {
    this.state = {
      devpool: 0,
      devpoolMembers: 0,
      teamSelect: 0,
      membersInSelectedTeamInspect: 0,
      ranInspect: 0
    };

    this.setState = obj => {
      let key = Object.keys(obj)[0];
      let value = Object.values(obj)[0];
      this.state[key] = value;
      that.forceUpdate();
    };

    this.getDPTeams = () => {
      axios
        .get("http://sdc.thummel.site:3004/devpool")
        .then(resp => {
          if (resp.status == 200) {
            this.setState({ devpool: resp.data });
          }
        })
        .catch(e => {
          console.log(e);
        });
    };

    this.showDPTeams = () => {
      if (state.devpool) {
        this.setState({ devpool: 0 });
      } else {
        this.getDPTeams();
      }
    };

    this.getDPMembers = () => {
      axios
        .get("http://sdc.thummel.site:3004/devpool/members")
        .then(resp => {
          if (resp.status == 200) {
            this.setState({ devpoolMembers: resp.data });
          }
        })
        .catch(e => {
          console.log(e);
        });
      // this.forceUpdate();
    };

    this.updateUser = (user, doc) => {
      this.setState({ user: user });
      doc.getElementById("shadow").remove();
    };

    this.joinTeam = () => {
      if (!this.state.teamSelect) {
        this.setState({ teamSelect: true });
        this.teamJoinSelector();
      } else {
        this.setState({ teamSelect: false });
      }
    };

    this.listTeamMembers = sTeam => {
      let members = {};
      let retTotal = [];
      let ret;

      // this.getDPMembers();
      axios
        .get("http://sdc.thummel.site:3004/devpool/members")
        .then(resp => {
          if (resp.status == 200) {
            this.setState({ devpoolMembers: resp.data });

            this.state.devpoolMembers.map((el, index) => {
              let tn = el.team_name;
              if (tn == sTeam) {
                retTotal.push(
                  <div
                    key={index}
                    style={{
                      background: `rgba(${(Math.pow(el.team_user.length, 2) %
                        25) *
                        10}, ${(Math.pow(el.team_user.length, 2) *
                        el.team_user.charCodeAt(0)) %
                        256}, ${el.team_user.length * 15}, 0.5`
                    }}
                  >
                    <div id="dev-lead">{el.team_user}</div>
                  </div>
                );
              }
              ret = retTotal.map(el => {
                return el;
              });
              ret = <div className="members-area">{ret}</div>;
              this.setState({ membersInSelectedTeamInspect: ret });
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    };

    this.createTeam = () => {
      // if (this.state.create) {
      // this.setState({create: false});
      return <img src={logo} className="front" />;
      // } else {
      //   this.setState({create: true});
      // }
    };

    /* View in fullscreen */
    this.openFullscreen = () => {
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
    this.closeFullscreen = () => {
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

    this.organizeDP = () => {
      let teams = {};
      let ret;
      let retTotal = [];
      this.state.devpool.map((el, index) => {
        let tn = el.team_name;
        if (teams[tn] != true) {
          teams[tn] = true;

          retTotal.push(
            <a className="dp-select-team" data-tip data-for="dp-inspect-tip">
              <div
                key={index}
                id={index}
                className="devpool-row"
                style={{
                  background: `rgba(${(Math.pow(el.team_name.length, 2) % 25) *
                    10}, ${(Math.pow(el.team_name.length, 2) *
                    el.team_name.charCodeAt(0)) %
                    256}, ${el.team_name.length * 15}, 0.5`
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
            </a>
          );
        }
      });
      ret = retTotal.map((el, index) => {
        return el;
      });
      ret = <div className="devpool-area"> {ret} </div>;
      return ret;
    };

    this.teamInspectSelector = () => {
      if (
        !this.state.ranInspect &&
        this.state.devpool &&
        !this.state.teamSelect
      ) {
        var ret;
        let devpoolEntry = this.state.devpool;
        let dpSelect = document.getElementsByClassName("devpool-row");
        for (let i = 0; i < dpSelect.length; i++) {
          dpSelect[i].onmouseenter = () => {
            this.listTeamMembers(devpoolEntry[dpSelect[i].id].team_name);
            dpSelect[i].style.boxShadow = "0 0 20px orange";
          };
          dpSelect[i].onmouseleave = () => {
            dpSelect[i].style.boxShadow = "none";
            this.setState({ devpoolMembers: 0 });
          };
          dpSelect[i].onmousedown = function() {};
        }
        this.setState({ ranInspect: true });
        if (ret) {
          return ret;
        }
      }
    };

    this.teamJoinSelector = () => {
      // if (
      //   document.getElementsByClassName("devpool-row")
      // ) {
      let dpSelect = document.getElementsByClassName("devpool-row");
      let finishJoin = (msg, j) => {
        this.getDPMembers(msg.team_name);
        this.setState({ teamSelect: false });
        this.setState({ ranInspect: false });
        dpSelect[j].style.boxShadow = "none";
      };

      let devpoolEntry = this.state.devpool;
      for (let i = 0; i < dpSelect.length; i++) {
        dpSelect[i].onmouseenter = function() {
          this.style.boxShadow = "0 0 20px white";
          // this.style.cursor =
          //   "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
          // for (let j = 0; j < this.childElementCount; j++) {
          //   this.children[j].style.cursor =
          //     "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
          // }
        };
        dpSelect[i].onmouseleave = function() {
          this.style.boxShadow = "none";
        };
        dpSelect[i].onmousedown = function() {
          console.log("JOIN TEAM: " + devpoolEntry[dpSelect[i].id].team_name);
          axios
            .post("http://sdc.thummel.site:3004/db/join_team", {
              team: devpoolEntry[dpSelect[i].id].team_name,
              desc:
                "New Database item about joining " +
                devpoolEntry[dpSelect[i].id].team_name,
              lead: devpoolEntry[dpSelect[i].id].team_lead
            })
            .then(resp => {
              console.log("test");
              console.log(resp.status + ": " + JSON.stringify(resp.data));
              finishJoin(devpoolEntry[i].team_name, i);
            })
            .catch(err => {
              console.log("error: " + err);
              finishJoin(devpoolEntry[i].team_name, i);
              // finishJoin(err);
            });
        };
      }
      // }
    };
  }
}

export default dpAPI;
