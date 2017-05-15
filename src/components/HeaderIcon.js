import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/header-icon.css';

class HeaderIcon extends React.Component {

  /* this component is the icon on the very first line of the App
  case the user is on the 25min state of the pomodore, a code icon will be displayed
  otherwise (on a break, either long o short), a coffee icon will be displayed, meaning that
  it's time to take a rest. */

  constructor(props) {
    super(props);
    this.state = {
      isTimeToWork: true
    };
  }

  /* always that some props update (in this case, the pomodoCounter), this function
  will call the setIfIsTimeToWorkOrToRest function */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setIfIsTimeToWorkOrToRest();
    }
  }

  /* case the pomodoroCounter prop is even, this function will set the isTimeToWork state to true
  and if is odd, will set to false */
  setIfIsTimeToWorkOrToRest () {
    this.setState({
      isTimeToWork: this.props.pomodoroCounter % 2 === 0
    });
  }

  render() {

    /* if the pomodoroCounter props is even, it means that the user is on the 25min work state
    and if it's odd, means that he's on the time to rest */
    let isTimeToWork = this.state.isTimeToWork;

    // will set the headerIcon based on the isTimeToWork state
    let headerIcon = {
      name: isTimeToWork ? 'code' : 'coffee',
      color: isTimeToWork ? 'lightblue' : '#6f4e37'
    }

    return (
      <FontAwesome name={headerIcon.name} className='header-icon' style={{color: headerIcon.color}}/>
    );
  }

}

export default HeaderIcon;
