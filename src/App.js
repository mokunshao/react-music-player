import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Player from "./Player";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount=()=>{
      fetch("data.json").then(res => {
        if (res.ok) {
          res.json().then(data => {
            this.setState({ playList: data });
          });
        }
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        {this.state.playList ? <Player playList={this.state.playList} /> : null}
      </div>
    );
  }
}

export default App;
