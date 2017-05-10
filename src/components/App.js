import React from 'react';
import MainContainer from './MainContainer';

const style = {
  textAlign: 'center'
}

class App extends React.Component {

  render() {
    return (
      <div style={style}>
        <h1>Pomodoro Timer</h1>
        <MainContainer/>
      </div>
    );
  }

}

export default App;
