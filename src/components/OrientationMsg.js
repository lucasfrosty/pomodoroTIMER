import React from 'react';

class OrientationMsg extends React.Component {

  setMessage() {
    /* choose the message to display based on which pomodoro state you are
    pomodoroCounter === 7 means that you're on the 'last' pomodoro and you should take a break
    pomodoroCounter been a even number means that you are on the 25min state and u need to work
    pomodoroCounter odd means that it's time to take a break */

    if (this.props.pomodoroCounter === 7) {
      return "It's time to take a longer break now.";
    } else if (this.props.pomodoroCounter % 2 === 0) { // check if it's a even number
      return "Time to code, baby!!";
    } else {
      return "Now, take a short break.";
    }
  }


  render() {
    let msg = this.setMessage();

    /* this variable was necessary because the pomodoroCounter is actually
    counting the pomodores and the rest that was done, so is necessary to
    divide by 2 to get the actual amount of pomodores done */
    let pomodorosDone = Math.round(this.props.pomodoroCounter/2);

    return (
      <div>
        <h2>{pomodorosDone} {pomodorosDone === 1 ? 'pomodoro' : 'pomodoros'} done so far</h2>
        <p>{msg}</p>
      </div>
    );
  }

}

export default OrientationMsg;
