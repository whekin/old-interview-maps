import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { validateInput, validateInputs } from '../helpers/validate';
import { connect } from 'react-redux';
import { notification } from '../redux/notifications';

const validData = {
  email: ["email", {}],
  password: ["password", {}],
  username: ["text", { minLength: 5 }]
};

class SignUpForm extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleBlur = e => {
    validateInput(
      validData,
      e.target.name,
      e.target.value);
  }

  handleSubmit = e => {
    e.preventDefault();
    const isValid = validateInputs(validData, this.state);
    const { username, email, password } = this.state;

    if (isValid) {
      Meteor.call("accounts.create", {
        username,
        email,
        password
      }, (err, res) => {
        if (err) {
          notification("error", err);
        }
        if (res) {
          this.props.history.push("/login");
        }
      });
    }
  }

  render() {
    const commonHandlers = {
      onChange: this.handleChange,
      onBlur: this.handleBlur
    };

    return (
      <div className="SignUpForm">
        <form onSubmit={this.handleSubmit}>
          <input
            {...commonHandlers}
            name="username"
            type="text"
            minLength="3"
            placeholder="Nickname"
            onChange={this.handleChange}
            required />
          <input
            {...commonHandlers}
            name="email"
            type="email"
            onChange={this.handleChange}
            placeholder="Email"
            required />
          <input
            {...commonHandlers}
            name="password"
            type="password"
            maxLength="15"
            onChange={this.handleChange}
            placeholder="Password"
            required />
          <button type="submit">SIGN UP</button>
          <center>
            <span>If you have an account, <Link to="/login">Log in</Link></span>
          </center>
        </form>
      </div>
    );
  }
};

const SignUpFormWithRedux = connect(null, { notification })(SignUpForm);

export default withRouter(SignUpFormWithRedux);
