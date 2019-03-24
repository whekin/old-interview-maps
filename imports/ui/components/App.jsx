import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '/imports/ui/styles/main.scss';
import StartPage from './StartPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

class App extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Router>
        <div className="App">
          <Route exact path="/"
            component={currentUser ? HomePage : StartPage} />
          <Route path="/login"
            component={LoginPage} />
          <Route path="/signup"
            component={SignUpPage} />
        </div>
      </Router>
    );
  }
}

export default withTracker(() => ({
  currentUser: Meteor.user()
}))(App);
