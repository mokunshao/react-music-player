import React, { Component } from "react";
import "./Player.css";
import ReactPlayer from "react-player";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.5,
      currentId: 0,
      currentTitle: null,
      currentArtist: null,
      playList: [
        { id: 0, title: "歌曲一", artist: "歌手一", url: "1.mp3", img: "a.png" },
        { id: 1, title: "歌曲二", artist: "歌手二", url: "2.m4a", img: "b.png" }
      ],
      progress: 0,
      loop: false,
      played: null,
      duration: null
    };
    this.playPause = () => {
      this.setState(state => ({
        playing: !state.playing
      }));
    };
    this.setVolume = e => {
      this.setState({ volume: parseFloat(e.target.value) });
    };
    this.playPre = () => {
      if (this.state.currentId - 1 < 0) {
        this.setState(state => ({
          currentId: state.playList.length - 1
        }));
      } else {
        this.setState(state => ({
          currentId: state.currentId - 1
        }));
      }
      this.setState(() => ({
        playing: true
      }));
    };
    this.playNext = () => {
      if (this.state.currentId + 1 >= this.state.playList.length) {
        this.setState(state => ({
          currentId: 0
        }));
      } else {
        this.setState(state => ({
          currentId: state.currentId + 1
        }));
      }
      this.setState(() => ({
        playing: true
      }));
    };
    this.setProgress = e => {
      this.refs.player.seekTo(parseFloat(e.target.value).toFixed(2));
    };
    this.loopPlay = () => {
      this.setState(state => ({
        loop: !state.loop
      }));
    };
  }

  render() {
    return (
      <div className="player">
        <ReactPlayer
          loop={this.state.loop}
          height="0"
          width="0"
          ref="player"
          url={this.state.playList[this.state.currentId].url}
          playing={this.state.playing}
          volume={this.state.volume}
          onProgress={() => {
            this.setState(() => ({
              progress:
                this.refs.player.getCurrentTime() /
                this.refs.player.getDuration(),
              played: this.refs.player.getCurrentTime(),
              duration: this.refs.player.getDuration()
            }));
          }}
          onEnded={() => {
            this.playNext();
          }}
        />
        <h3>我的音乐</h3>
        <div>{this.state.playList[this.state.currentId].title}</div>
        <div>{this.state.playList[this.state.currentId].artist}</div>
        <img src={this.state.playList[this.state.currentId].img} alt="cover" />
        <span>
          {this.state.played}/{this.state.duration}
        </span>
        <div>
          <button onClick={this.playPause}>
            {this.state.playing ? "pause" : "play"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={this.state.volume}
            onChange={this.setVolume}
          />
        </div>
        <button onClick={this.playPre}>pre</button>
        <button onClick={this.playNext}>next</button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={this.state.progress}
          onChange={this.setProgress}
        />
        <button onClick={this.loopPlay}>
          {this.state.loop ? "单曲循环" : "全曲循环"}
        </button>
        <Link to="/list">歌单</Link>
      </div>
    );
  }
}

export default Player;
