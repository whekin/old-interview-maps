import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Provider } from 'react-redux';
import Notifications from './Notifications';
import '/imports/ui/styles/main.scss';
import StartPage from './StartPage';
import HomePage from './HomePage';

import store from '../redux';

class App extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Provider store={store}>
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
          <Notifications />
        </Router>
      </Provider>
    );
  }
}

export default withTracker(() => ({
  currentUser: Meteor.user()
}))(App);
