import React, { Component } from 'react';
import StartPageBackground from './StartPageBackground';

class StartPage extends Component {
  render() {
    return (
      <>
        <StartPageBackground />
        <div className="StartPage">
          <h1>Welcome to wonderful maps</h1>
        </div>
      </>
    );
  }
};

export default StartPage;
