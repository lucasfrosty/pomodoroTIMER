import React from 'react';
import Button from './Button';
import FontAwesome from 'react-fontawesome';

class ButtonContainer extends React.Component {

  render() {
    return (
      <div>
        <Button handleClick={this.props.updateTimeEverySecond} 
          buttonClass="button all-caps start-button">
          <FontAwesome name='play'/> Start
        </Button>

        <Button handleClick={this.props.pauseTime} buttonClass="button all-caps pause-button">
          <FontAwesome name='pause'/> Pause
        </Button>

        <Button handleClick={this.props.refreshTime} buttonClass="button all-caps restart-button">
          <FontAwesome name='refresh'/> Refresh
        </Button>

        <Button handleClick={this.props.resetTime} buttonClass="button all-caps reset-button">
          <FontAwesome name='backward'/> Reset
        </Button>
      </div>
    );
  }

}

export default ButtonContainer;
