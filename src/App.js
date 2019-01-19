import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Player from "./Player";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactPlayer from "react-player";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.5,
      currentId: 0,
      currentTitle: null,
      currentArtist: null,
      playList: [
        {
          id: 0,
          title: "歌曲1",
          artist: "歌手1",
          url: "1.mp3",
          img: "a.png"
        },
        { id: 1, title: "歌曲2", artist: "歌手2", url: "2.mp3", img: "b.png" },
        { id: 2, title: "歌曲3", artist: "歌手3", url: "2.mp3", img: "c.png" }
      ],
      progress: 0,
      loop: false,
      played: null,
      duration: null
    };
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Player} />
          <Route path="/list" component={List} />
        </div>
      </Router>
    );
  }
}

const List = () => <h2>List</h2>;

export default App;
