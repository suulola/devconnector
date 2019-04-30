import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
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
        </div>
      </nav>
    );
  }
}

export default Navbar;
