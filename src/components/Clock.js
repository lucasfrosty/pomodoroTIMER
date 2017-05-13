import React from 'react';
import '../css/clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);

  }

  /* recieve the time in seconds as a parameter and convert it to minutes and
  seconds */
  convertTime(time) {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (time - minutes * 60).toString();

    if (seconds.length === 1) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`;
  }

  // TODO: Style the timer displayer
  render() {
    let timeInMinutes = this.convertTime(this.props.time);

    return (
        <h2 className='clock'>{timeInMinutes}</h2>
    );
  }

}

export default Clock;
