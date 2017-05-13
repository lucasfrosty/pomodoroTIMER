import React from 'react';
import Clock from './Clock';
import HeaderIcon from './HeaderIcon';
import ButtonContainer from './ButtonContainer';
import OrientationMsg from './OrientationMsg';

const POMODORO_TIME = 3;
const REST_TIME = 300;
const LAST_REST_TIME = 900;



class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: POMODORO_TIME,
      pomodoroCounter: 0 // this state sets how many times a pomodoro was done
    };

    // binding functions
    this.updateTime = this.updateTime.bind(this);
    this.updateTimeEverySecond = this.updateTimeEverySecond.bind(this);
    this.restartTime = this.restartTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.getPrimaryIcon = this.getPrimaryIcon.bind(this);

  }

  // get the time of the next pomodoro based on the current pomodoro state
  getTime = (pomodoroCounter) => {
    // check if thats the last pomodoro
    if (pomodoroCounter === 7) {
      return LAST_REST_TIME;
    } // checks if the current pomodoro is even or odd and sets the time based on that
    else if (pomodoroCounter % 2 === 0) {
      return POMODORO_TIME;
    } else {
      return REST_TIME;
    }
  }

  updateTime() {
    if (this.state.time === 0) { // entries the loop if the time is over
      this.setState({
        time: this.getTime(this.state.pomodoroCounter + 1),
        pomodoroCounter: (this.state.pomodoroCounter + 1) % 8

        /* was necessary to use pomodoroCounter + 1 here because the getTime
        would've return the time based on the previous counter since i didn't
        incremented that yet */

      });
      this.pauseTime();

    } else {
      this.setState({
        time: this.state.time - 1
      });
    }
  }

  updateTimeEverySecond = () => this.timerID = setInterval(this.updateTime, 1000);

  resetTime() {
    this.setState({
      time: POMODORO_TIME,
      pomodoroCounter: 0
    });
    this.pauseTime();
  }

  // the function restart the current time and pauses the clock.
  restartTime() {
    this.setState({
      time: this.getTime(this.state.pomodoroCounter)
    });
    this.pauseTime();
  }

  pauseTime = () => clearInterval(this.timerID);

  getPrimaryIcon() {
    if (this.state.pomodoroCounter % 2 === 0) {
      return 'code';
    } else {
      return 'coffee';
    }
  }

  render() {

    return (
      <div>
        <HeaderIcon pomodoroCounter={this.state.pomodoroCounter}/>
        <Clock time={this.state.time}/>
        <ButtonContainer updateTimeEverySecond={this.updateTimeEverySecond}
          pauseTime={this.pauseTime}
          restartTime={this.restartTime}
          resetTime={this.resetTime}
        />
        <OrientationMsg pomodoroCounter={this.state.pomodoroCounter}/>
      </div>
    );
  }

}

export default MainContainer;
