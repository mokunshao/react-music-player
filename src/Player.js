import React, { Component } from "react";
import "./Player.css";
import ReactPlayer from "react-player";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.5,
      currentId: 0,
      progress: 0,
      loop: false,
      played: 0,
      duration: 0
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
          currentId: props.playList.length - 1
        }));
      } else {
        this.setState(state => ({
          currentId: state.currentId - 1
        }));
      }
      this.setState(() => ({
        playing: true,
        progress: 0
      }));
    };
    this.playNext = () => {
      if (this.state.currentId + 1 >= this.props.playList.length) {
        this.setState(state => ({
          currentId: 0
        }));
      } else {
        this.setState(state => ({
          currentId: state.currentId + 1
        }));
      }
      this.setState(() => ({
        playing: true,
        progress: 0
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
          url={this.props.playList[this.state.currentId].url}
          playing={this.state.playing}
          volume={this.state.volume}
          onProgress={() => {
            this.setState(() => ({
              progress:
                this.refs.player.getCurrentTime() /
                this.refs.player.getDuration(),
              played: parseInt(this.refs.player.getCurrentTime()),
              duration: parseInt(this.refs.player.getDuration())
            }));
          }}
          onEnded={() => {
            this.playNext();
          }}
        />
        <section className="playerMain">
          <section className="playerLeft">
            <div className="title">
              {this.props.playList[this.state.currentId].title}
            </div>
            <div className="artist">
              {this.props.playList[this.state.currentId].artist}
            </div>
            <div className="volumeControl">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-volume" />
              </svg>
              <input
                className="volume"
                type="range"
                min={0}
                max={1}
                step="any"
                value={this.state.volume}
                onChange={this.setVolume}
              />
            </div>
            <div className="playerControl">
              <span onClick={this.playPre}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-previous" />
                </svg>
              </span>
              <span onClick={this.playPause}>
                {this.state.playing ? (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-pause" />
                  </svg>
                ) : (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play" />
                  </svg>
                )}
              </span>
              <span onClick={this.playNext}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-next" />
                </svg>
              </span>
              <input
                className="progress"
                type="range"
                min={0}
                max={1}
                step="any"
                value={this.state.progress}
                onChange={this.setProgress}
              />
              <span>
                {this.state.played.toString().padStart(2, "0")}/
                {this.state.duration}
              </span>
              <span onClick={this.loopPlay}>
                {this.state.loop ? (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-Repeat_" />
                  </svg>
                ) : (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-Repeat" />
                  </svg>
                )}
              </span>
            </div>
          </section>
          <section>
            <img
              src={this.props.playList[this.state.currentId].img}
              alt="cover"
            />
          </section>
        </section>
        <svg style={{ display: "none" }}>
          <symbol id="icon-pause" viewBox="0 0 1024 1024">
            <path d="M256 810.666667l170.666667 0L426.666667 213.333333 256 213.333333 256 810.666667zM597.333333 213.333333l0 597.333333 170.666667 0L768 213.333333 597.333333 213.333333z" />
          </symbol>
          <symbol id="icon-volume" viewBox="0 0 1024 1024">
            <path d="M216.064 357.376c-57.584941 0-93.364706 30.117647-93.364706 78.667294l0 130.168471c0 24.997647 9.697882 48.429176 27.286588 66.138353 17.588706 17.648941 41.080471 27.407059 66.078118 27.407059l104.990118 0 342.497882 342.618353 0-989.605647-339.124706 344.606118-108.363294 0zM603.316706 159.864471l0 697.042824-257.325176-257.385412-129.987765 0c-18.251294 0-33.069176-14.938353-33.069176-33.310118l0-130.168471c0-5.481412 0-18.432 33.129412-18.432l133.541647 0 253.711059-257.746824zM723.124706 661.805176l0-60.235294c33.490824 0 60.717176-27.226353 60.717176-60.717176s-27.226353-60.717176-60.717176-60.717176l0-60.235294c66.680471 0 120.952471 54.272 120.952471 120.952471s-54.272 120.952471-120.952471 120.952471zM965.511529 541.334588c0 132.879059-108.062118 240.941176-240.941176 240.941176l0-60.235294c99.629176 0 180.705882-81.076706 180.705882-180.705882s-81.076706-180.705882-180.705882-180.705882l0-60.235294c132.818824 0 240.941176 108.122353 240.941176 240.941176z" />
          </symbol>
          <symbol id="icon-play" viewBox="0 0 1024 1024">
            <path d="M900.571429 529.714286L141.714286 951.428571q-13.142857 7.428571-22.571429 1.714286T109.714286 932.571429V91.428571q0-14.857143 9.428571-20.571428t22.571429 1.714286l758.857143 421.714285q13.142857 7.428571 13.142857 17.714286t-13.142857 17.714286z" />
          </symbol>
          <symbol id="icon-next" viewBox="0 0 1024 1024">
            <path
              d="M161.792 824.448A64.106667 64.106667 0 0 1 128 768V256a64.021333 64.021333 0 1 1 99.52-53.248l384 256a64 64 0 0 1-0.064 106.496l-384 256a63.872 63.872 0 0 1-65.664 3.2zM704 832c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64h-128z"
              fill=""
            />
          </symbol>
          <symbol id="icon-previous" viewBox="0 0 1024 1024">
            <path
              d="M862.208 824.448a63.872 63.872 0 0 1-65.664-3.2l-384-256a64 64 0 0 1-0.064-106.496l384-256A64.021333 64.021333 0 0 1 896 256v512a64.106667 64.106667 0 0 1-33.792 56.448zM320 832H192c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64z"
              fill=""
            />
          </symbol>
          <symbol id="icon-Repeat" viewBox="0 0 1217 1024">
            <path
              d="M50.668325 566.71837a50.668325 50.668325 0 0 0 50.668324-50.668324v-158.591856a126.670812 126.670812 0 0 1 126.670812-126.670812h815.000001l-42.054709 42.05471a50.668325 50.668325 0 0 0 35.97451 86.389493 50.668325 50.668325 0 0 0 35.721169-14.693814l126.670811-126.670811a50.668325 50.668325 0 0 0 0-74.482438l-126.670811-126.670811a50.668325 50.668325 0 1 0-71.695679 71.442338l42.054709 42.054709H228.007461a228.007461 228.007461 0 0 0-228.007461 228.007461v158.845197a50.668325 50.668325 0 0 0 50.668325 49.654958zM1165.371466 458.288156a50.668325 50.668325 0 0 0-50.668325 50.668324v158.845198a126.670812 126.670812 0 0 1-126.670811 126.670812H173.28567l42.05471-42.05471a50.668325 50.668325 0 1 0-71.69568-71.695679l-126.670811 126.670811a50.668325 50.668325 0 0 0 0 74.735779l126.670811 126.670812a50.668325 50.668325 0 0 0 71.69568 0 50.668325 50.668325 0 0 0 0-70.428972l-42.05471-42.814734H988.03233a228.007461 228.007461 0 0 0 228.00746-228.007461v-158.338514a50.668325 50.668325 0 0 0-50.668324-50.921666z"
              fill="#3A3A3A"
            />
          </symbol>
          <symbol id="icon-Repeat_" viewBox="0 0 1217 1024">
            <path
              d="M50.668325 566.71837a50.668325 50.668325 0 0 0 50.668324-50.668324v-158.591856a126.670812 126.670812 0 0 1 126.670812-126.670812h815.000001l-42.054709 42.05471a50.668325 50.668325 0 0 0 35.97451 86.389493 50.668325 50.668325 0 0 0 35.721169-14.693814l126.670811-126.670811a50.668325 50.668325 0 0 0 0-74.482438l-126.670811-126.670811a50.668325 50.668325 0 1 0-71.695679 71.442338l42.054709 42.054709H228.007461a228.007461 228.007461 0 0 0-228.007461 228.007461v158.845197a50.668325 50.668325 0 0 0 50.668325 49.654958zM1165.371466 458.288156a50.668325 50.668325 0 0 0-50.668325 50.668324v158.845198a126.670812 126.670812 0 0 1-126.670811 126.670812H173.28567l42.05471-42.05471a50.668325 50.668325 0 1 0-71.69568-71.695679l-126.670811 126.670811a50.668325 50.668325 0 0 0 0 74.735779l126.670811 126.670812a50.668325 50.668325 0 0 0 71.69568 0 50.668325 50.668325 0 0 0 0-70.428972l-42.05471-42.814734H988.03233a228.007461 228.007461 0 0 0 228.00746-228.007461v-158.338514a50.668325 50.668325 0 0 0-50.668324-50.921666z"
              fill="#3A3A3A"
            />
            <path
              d="M662.741686 680.215418a38.001243 38.001243 0 0 0 38.001243-38.001244V382.792352a37.49456 37.49456 0 0 0-23.054087-34.707802 38.254585 38.254585 0 0 0-41.041343 6.840224l-108.683557 101.336649a38.001243 38.001243 0 0 0 50.668325 55.735157l45.094809-41.801368v172.018962a38.001243 38.001243 0 0 0 39.01461 38.001244z"
              fill="#3A3A3A"
            />
          </symbol>
        </svg>
      </div>
    );
  }
}

export default Player;
