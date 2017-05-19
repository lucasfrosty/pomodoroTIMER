import React from 'react';
import Clock from './Clock';
import HeaderIcon from './HeaderIcon';
import ButtonContainer from './ButtonContainer';
import OrientationMsg from './OrientationMsg';

const POMODORO_TIME = 1500;
const REST_TIME = 300;
const LAST_REST_TIME = 900;

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: POMODORO_TIME, // state that sets the time (in a brute integer number that will be converted to MM:SS later)
      pomodoroCounter: 0, // this state sets how many times a pomodoro was done
      isRunning: false // state that sets if the clock is running or not
    };
  }

  // this function get the time of the next pomodoro based on the current pomodoro state
  getTime = (pomodoroCounter) => {
    // check if thats the last pomodoro
    if (pomodoroCounter === 7) {
      return LAST_REST_TIME;
    } else if (pomodoroCounter % 2 === 0) {
      return POMODORO_TIME;
    } else {
      return REST_TIME;
    }
  }

  updateTime = () => {
    if (this.state.time === 0) {
      /* this block of code will do everything that's need to be done when the
      time is over: send the notification, pass to the other state and pause the time */
      this.playSound();
      this.sendNotification();

      this.setState({
        /* was necessary to use pomodoroCounter + 1 here because the getTime
        would've return the time based on the previous counter since i didn't
        incremented that yet */
        pomodoroCounter: (this.state.pomodoroCounter + 1) % 8,
        time: this.getTime(this.state.pomodoroCounter + 1)
      });
      this.pauseTime();
    } else {
      // if the time is not over, just drecrement 1s of the time
      this.setState({
        time: this.state.time - 1
      });
      if (this.state.isRunning === false) {
        this.setState({isRunning: true});
      }
    }
  }

  /* this function will check if the clock is already running,
  in case is running, the updateTime function will not be called again */
  updateTimeEverySecond = () => {
    if (this.state.isRunning) {
      alert('The clock is running already');
    } else {
      this.timerID = setInterval(this.updateTime, 1000);
    }
  }

  pauseTime = () => {
    this.setState({isRunning: false});
    clearInterval(this.timerID);
  }

  // the function restart the current time and pauses the clock.
  refreshTime = () => {
    this.setState({
      time: this.getTime(this.state.pomodoroCounter)
    });
    this.pauseTime();
  }

  resetTime = () => {
    this.setState({time: POMODORO_TIME, pomodoroCounter: 0});
    this.pauseTime();
  }

  /* this function recieve the time in seconds as a parameter and convert
  it to minutes and seconds */
  convertTime = (time) => {
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

  /* this function is using the sound on a base64 data URI, so i chose to pass the data uri
  as props because the string was really huge */
  playSound = () => {
    let audio = new Audio(this.props.base64url);
    audio.play();
  }

  isWorkTime = () => !this.state.pomodoroCounter % 2;

  createNotification = () => {
    let notificationSettings = {
      title: 'pomoid',
      body: this.isWorkTime()
        ? "You have a 5 minutes break, you must not do anything about the work."
        : 'Your rest time is over, you have 25 minutes to do your stuffs. LET\'S CODE!!11',
      icon: this.isWorkTime()
        ? 'https://maxcdn.icons8.com/Color/PNG/96/Transport/stop_sign-96.png'
        : 'https://maxcdn.icons8.com/Color/PNG/96/Transport/go-96.png'
    }

    new Notification(notificationSettings.title, {
      icon: notificationSettings.icon,
      body: notificationSettings.body
    })
  }

  // code get from mozilla official documentation
  sendNotification = () => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") { // notification permissions have already been granted
      this.createNotification();
    } else if (Notification.permission !== 'denied') { // Otherwise, we need to ask the user for permission
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          this.createNotification();
        }
      });
    }
  }

  render() {
    let timeInMinutes = this.convertTime(this.state.time);

    // setting the page title to 'MM:SS - pomoid'
    this.setPageTitle(timeInMinutes + ' - pomoid');

    return (
      <div>
        <HeaderIcon pomodoroCounter={this.state.pomodoroCounter}/>
        <Clock>{timeInMinutes}</Clock>
        <ButtonContainer updateTimeEverySecond={this.updateTimeEverySecond} pauseTime={this.pauseTime} refreshTime={this.refreshTime} resetTime={this.resetTime} isRunning={this.state.isRunning}/>
        <OrientationMsg pomodoroCounter={this.state.pomodoroCounter}/>
      </div>
    );
  }

}

export default MainContainer;
