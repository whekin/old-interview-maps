import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StartPageBackground from './StartPageBackground';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

class StartPage extends Component {
  render() {
    return (
      <>
        <StartPageBackground />
        <div className="StartPage">
          <h1>Welcome to wonderful maps</h1>
          <Route path="/login"
            component={LoginForm} />
          <Route path="/signup"
            component={SignUpForm} />
        </div>
      </>
    );
  }
};

export default StartPage;
