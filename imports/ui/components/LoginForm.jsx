import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { validateInput, validateInputs } from '../helpers/validate';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { notification } from '../redux/notifications';

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
      const { notification } = this.props;

      e.preventDefault();
      const isValid = validateInputs(validData, this.state);

      if (isValid) {
        const { email, password } = this.state;

        Meteor.loginWithPassword(email, password, err => {
          if (err) {
            notification("error", err);
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

const LoginFormWithRedux = connect(null, { notification })(LoginForm);

export default withRouter(LoginFormWithRedux);
