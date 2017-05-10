import React from 'react';
import Timer from './Timer';
import Button from './Button';

const POMODORE_TIME = 1500;
const REST_TIME = 300;
const LAST_REST_TIME = 900;

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: POMODORE_TIME,
      pomodoreCounter: 0 // this state sets how many times a pomodore was done
    };

    // binding functions
    this.updateTime = this.updateTime.bind(this);
    this.updateTimeEverySecond = this.updateTimeEverySecond.bind(this);
    this.restartTime = this.restartTime.bind(this);
    this.resetTime = this.resetTime.bind(this);

  }

  // get the time of the next pomodore based on the current pomodore state
  getTime = (pomodoreCounter) => {
    // check if thats the last pomodore
    if (pomodoreCounter === 7) {
      return LAST_REST_TIME;
    } // checks if the current pomodore is even or odd and sets the time based on that
    else if (pomodoreCounter % 2 === 0) {
      return POMODORE_TIME;
    } else {
      return REST_TIME;
    }
  }

  updateTime() {
    if (this.state.time === 0) { // entries the loop if the time is over
      this.setState({
        time: this.getTime(this.state.pomodoreCounter + 1),
        pomodoreCounter: (this.state.pomodoreCounter + 1) % 8

        /* was necessary to use pomodoreCounter + 1 here because the getTime
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
      time: this.getTime(this.state.pomodoreCounter + 1),
      pomodoreCounter: 0
    });
  }

  // the function restart the current time and pauses the clock.
  restartTime() {
    this.setState({
      time: this.getTime(this.state.pomodoreCounter)
    });
    this.pauseTime();
  }

  pauseTime = () => clearInterval(this.timerID);


  render() {
    return (
      <div>
        <Timer time={this.state.time}/>
        <div>
          <Button handleClick={this.updateTimeEverySecond} buttonClass="button start-button">Começar</Button>
          <Button handleClick={this.pauseTime} buttonClass="button pause-button">Pausar</Button>
          <Button handleClick={this.restartTime} buttonClass="button restart-button">Recomeçar</Button>
          <Button handleClick={this.resetTime} buttonClass="button reset-button">Resetar</Button>
        </div>
        <h1>{this.state.pomodoreCounter} pomodores</h1>
      </div>
    );
  }

}

export default MainContainer;
