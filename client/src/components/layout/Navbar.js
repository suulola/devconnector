import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

export class Navbar extends Component {
  onLogoutClick = e => {
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div className="navbar-nav w-100 d-flex justify-content-end mr-5 pr-5">
        <a href="/" onClick={this.onLogoutClick} className="nav-link">
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              marginRight: "5px"
            }}
            title="You must have a Gravatar connected to your email to display an image"
          />
          Logout
        </a>
        <Link
          to="/profiles"
          className="nav-item nav-link text-muted d-md-none d-sm-block"
        >
          Developer
        </Link>
      </div>
    );
    const guestLinks = (
      <div className="navbar-nav w-100 d-flex justify-content-end mr-5 pr-5">
        <Link to="/register" className="nav-item nav-link text-muted">
          Sign Up
        </Link>
        <Link to="/login" className="nav-item nav-link text-muted">
          Login
        </Link>
        <Link
          to="/profiles"
          className="nav-item nav-link text-muted d-md-none d-sm-block"
        >
          Developer
        </Link>
      </div>
    );
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-dark mb-3">
        <div className="ml-5 pl-5">
          <Link to="/" className="navbar-brand text-white">
            DevConnector
          </Link>
          <Link
            to="/profiles"
            className="nav-link text-muted d-none d-md-inline"
          >
            Developers
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
