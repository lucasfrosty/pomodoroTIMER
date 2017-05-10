import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);

  }


  convertTime(time) {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (time - minutes * 60).toString();

    if (seconds.length === 1) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`;
  }

  render() {
    let timeInMinutes = this.convertTime(this.props.time);

    return (
      <div>
        <h2>{timeInMinutes}</h2>
      </div>
    );
  }

}

export default Timer;
