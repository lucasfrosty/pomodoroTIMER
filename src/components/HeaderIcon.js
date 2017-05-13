import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/header-icon.css';

class HeaderIcon extends React.Component {

  render() {
    let getHeaderIcon = this.props.pomodoroCounter % 2 === 0 ? 'code' : 'coffee';
    return (
      <FontAwesome name={getHeaderIcon} className='header-icon'></FontAwesome>
    );
  }

}

export default HeaderIcon;
