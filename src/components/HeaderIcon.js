import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/header-icon.css';

class HeaderIcon extends React.Component {

  /* this component is the icon on the very first line of the App
  case the user is on the 25min state of the pomodore, a code icon will be displayed
  otherwise (on a break, either long o short), a coffee icon will be displayed, meaning that
  it's time to take a rest. */

  render() {
    
    /* if the pomodoroCounter props is even, it means that the user is on the 25min work state
    and if it's odd, means that he's on the time to rest */
    let getHeaderIcon = this.props.pomodoroCounter % 2 === 0 ? 'code' : 'coffee';
    return (
      <FontAwesome name={getHeaderIcon} className='header-icon'></FontAwesome>
    );
  }

}

export default HeaderIcon;
