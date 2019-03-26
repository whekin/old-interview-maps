import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '/imports/ui/styles/main.scss';
import StartPage from './StartPage';
import HomePage from './HomePage';

class App extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={
            () => !currentUser ? <Redirect to="/signup" /> : ""} />
          <Route path="/(signup|login)" render={
            () => currentUser ? <Redirect to="/" /> : ""} />

          { currentUser
            ? <HomePage />
            : <StartPage />
          }
        </div>
        <Alert stack={{ limit: 3 }} html />
      </Router>
    );
  }
}

export default withTracker(() => ({
  currentUser: Meteor.user()
}))(App);
