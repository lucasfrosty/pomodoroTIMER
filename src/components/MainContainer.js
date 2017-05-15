import React from 'react';
import Clock from './Clock';
import HeaderIcon from './HeaderIcon';
import ButtonContainer from './ButtonContainer';
import OrientationMsg from './OrientationMsg';

const POMODORO_TIME = 5;
const REST_TIME = 3;
const LAST_REST_TIME = 900;



class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: POMODORO_TIME,
      pomodoroCounter: 0, // this state sets how many times a pomodoro was done
      isRunning: false
    };

    // binding functions
    this.updateTime = this.updateTime.bind(this);
    this.refreshTime = this.refreshTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.pauseTime = this.pauseTime.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);

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
      if (this.state.isRunning === false) {
        this.setState({
          isRunning: true
        });
      }
    }


  }

  playSound() {
    let audio = new Audio(this.props.base64url);
    audio.play();
  }

  // code get from mozilla documentation
  sendNotification() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") { // notification permissions have already been granted
      new Notification("Time's up!!");
    } else if (Notification.permission !== 'denied') { // Otherwise, we need to ask the user for permission
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification("Time's up!!");
        }
      });
    }
  }

  updateTimeEverySecond = () => this.timerID = setInterval(this.updateTime, 1000);

  pauseTime () {
    this.setState({
      isRunning: false
    });
    console.log('pausei');
    clearInterval(this.timerID);
  }

  // the function restart the current time and pauses the clock.
  refreshTime() {
    this.setState({
      time: this.getTime(this.state.pomodoroCounter)
    });
    this.pauseTime();
  }

  resetTime() {
    this.setState({
      time: POMODORO_TIME,
      pomodoroCounter: 0
    });
    this.pauseTime();
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

  setPageTitle(newTitle) {
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  }

  handleStartClick() {
    if(this.state.isRunning) {
      alert('The clock is running already');
    } else {
      this.updateTimeEverySecond();
    }
  }

  render() {
    if (this.state.time === 0) {
      this.playSound();
      this.sendNotification();
    }

    let timeInMinutes = this.convertTime(this.state.time);
    this.setPageTitle(timeInMinutes + ' - pomodoroTIMER');
    return (
      <div>
        <HeaderIcon pomodoroCounter={this.state.pomodoroCounter}/>
        <Clock>{timeInMinutes}</Clock>
        <ButtonContainer updateTimeEverySecond={this.handleStartClick}
          pauseTime={this.pauseTime}
          refreshTime={this.refreshTime}
          resetTime={this.resetTime}
          isRunning={this.state.isRunning}
        />
        <OrientationMsg pomodoroCounter={this.state.pomodoroCounter}/>
      </div>
    );
  }

}

export default MainContainer;
