import React, { Component } from 'react';

class Progress extends Component {
  render() {
    return (
      <div>
        {this.props.progress}s
      </div>
    );
  }
}

export default Progress;