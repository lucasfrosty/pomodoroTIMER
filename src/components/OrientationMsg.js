import React from 'react';

class OrientationMsg extends React.Component {

  setMessage() {
    if (this.props.pomodoroCounter === 7) {
      return "It's time to take a longer break now.";
    }
    else if (this.props.pomodoroCounter % 2 === 0) {
      return "Time to code, baby!!";
    } else {
      return "Take a short break.";
    }
  }
  render() {
    let msg = this.setMessage();
    
    return (
      <div>
        <h2>{this.props.pomodoroCounter} pomodoros done</h2>
        <p>{msg}</p>
      </div>
    );
  }

}

export default OrientationMsg;
