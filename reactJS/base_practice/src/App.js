import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/Input';
import UserOutput from './UserOutput/Output';

class App extends Component {
  state = {
    username: 'Christian'
  }

  changedUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput changed={this.changedUsernameHandler} />
        <UserOutput username={this.state.username} />
        <UserOutput username='Allie' />
      </div>
    );
  };
}

export default App;
