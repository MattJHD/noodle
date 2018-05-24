import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentWall } from "../../actions/wallActions";

import logo from "../../logo.png";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentWall();
    this.props.logoutUser();
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="align-left">
        <div
          className={
            this.state.open ? "menu-wrapper menu-open" : "menu-wrapper"
          }
        >
          <div id="menu">
            <ul className="link-list">
              <li>
                <Link to="/" open={this.state.open}>
                  Home
                </Link>
              </li>
              {/* <li><Link to="/login" open={this.state.open} >Login</Link></li> */}
              <li>
                <Link to="createRoom" open={this.state.open}>
                  Create room
                </Link>
              </li>
              <li>
                <Link to="wall" open={this.state.open}>
                  Wall
                </Link>
              </li>
              <li>
                <a href="#" onClick={this.onLogoutClick.bind(this)}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button
          className={
            this.state.open ? "menu-toggle close-button" : "menu-toggle "
          }
          onClick={this.toggleMenu.bind(this)}
        >
          X
        </button>
      </div>
    );

    const guestLinks = (
      <div className="align-left">
        <div
          className={
            this.state.open ? "menu-wrapper menu-open" : "menu-wrapper"
          }
        >
          <div id="menu">
            <ul className="link-list">
              <li>
                <Link to="/" open={this.state.open}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" open={this.state.open}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" open={this.state.open}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <button
          className={
            this.state.open ? "menu-toggle close-button" : "menu-toggle "
          }
          onClick={this.toggleMenu.bind(this)}
        >
          X
        </button>
      </div>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentWall })(
  Navbar
);
