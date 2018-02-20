import React, { Component } from 'react';
import './App.css';
import CheckValidation from './ValidationComponent/CheckValidation';
import Letter from './CharComponent/Letter';

class App extends Component {
  state = {
    text: ''
  }

  getTextHandler = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  deleteLetterHandler = (idx) => {
    const word = this.state.text.split('');
    word.splice(idx, 1);
    const updatedText = word.join('');
    this.setState({
      text: updatedText
    });
  }

  render() {

    const letters = this.state.text.split('').map((letter, idx) => {
      return <Letter char={letter} key={idx} clicked={() => this.deleteLetterHandler(idx)} />;
    });

    return (
      <div className="App">
        <input type="text" onChange={this.getTextHandler} value={this.state.text} />
        <p>Length: {this.state.text.length}</p>
        <CheckValidation textLength={this.state.text.length} />
        {letters}
      </div>
    );
  }
}

export default App;
