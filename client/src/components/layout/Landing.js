import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import "./landing.css";

class Landing extends Component {
  // Protect routes by checking if logged in
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/createRoom");
  //   }
  // }

  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Noodle.io</h1>
              <p className="lead">
                {" "}
                Prenez des notes ou dessinez, seul ou en groupe, pour le
                travail...ou pour le fun !
              </p>
              <hr />
              <Link
                to="/register"
                className="btn btn-lg btn-info mr-2 btn-landing"
              >
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-light btn-landing">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
