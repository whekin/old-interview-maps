import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { validateInput, validateInputs } from '../logic/validate';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-s-alert';

const validData = {
  email: ["email", {}],
  password: ["password", {}]
};

class LoginForm extends Component {
    state = {
      email: "",
      password: ""
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleBlur = e => {
      validateInput(validData, e.target.name, e.target.value);
    }

    handleSubmit = e => {
      e.preventDefault();
      const isValid = validateInputs(validData, this.state);

      if (isValid) {
        const { email, password } = this.state;

        Meteor.loginWithPassword(email, password, err => {
          if (err) {
            Alert.error(err);
          } else {
            this.props.history.push("/");
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
              name="email"
              type="email"
              placeholder="Email" />
            <input
              {...commonHandlers}
              name="password"
              type="password"
              placeholder="Password" />
            <button type="submit">LOGIN</button>
            <center>
              <span>If you have don't have any account, <Link to="/signup">Sing Up</Link></span>
            </center>
          </form>
        </div>
      );
    }
};

export default withRouter(LoginForm);
