import React, { Component } from 'react';
import { connect } from 'react-redux';
import { popNotification } from '../redux/notifications';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Notifications extends Component {
  handleClose = (...args) => {
    const { popNotification } = this.props;
    popNotification();
  }

  render() {
    return (
      <Alert
        stack={{ limit: 3 }}
        html
        offset={100}
        onClose={this.handleClose}
        effect="slide"
        timeout={3000} />
    );
  }
}

export default connect(
  state => ({ notifications: state.notifications.stack }),
  { popNotification })(Notifications);
