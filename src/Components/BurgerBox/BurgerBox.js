import { React, Component } from "react";
import NewsCard from "../NewsCard";

class BurgerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  render() {
    return (
      <>
        <div className="welcomeMessage" />
        {/* <button onClick={this.logout}>Logout</button> */}
        <div className="burgerbox" onClick={this.toggleBurg}>
          &#9776;
        </div>
        this.state.burger && (
        <div className="dropDown">
          <div className="tabs">
            <button className="dropButt" onClick={this.props.showDP}>
              Devpool List
            </button>
            <button className="dropButt">Teacherpool List</button>
            <button
              className="dropButt"
              onClick={() => {
                this.deleteUser(this.state.username, this.state.password);
              }}
            >
              Delete Acct.
            </button>
            <button className="dropButt" onClick={this.logout}>
              Logout
            </button>
          </div>
          <NewsCard />
        </div>
        )
      </>
    );
  }
}

export default BurgerBox;
