import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import classnames from 'classnames'
import { loginUser } from "../../actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const {errors} = this.props
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={this.onChange}
                    value={this.state.email}
                    className={classnames('form-control', {'is-invalid': errors.email})}
                  />
                  {errors.email && ( <div className="invalid-feedback">{errors.email}</div> )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    className={classnames('form-control', { 'is-invalid': errors.password })}

                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
