import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWall } from "../../actions/wallActions";
// import { logoutUser } from "../../actions/authActions";
import "./wall.css";

import WallItem from "./wallItem";

class Wall extends Component {
  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
    this.props.getCurrentWall();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //   }

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  render() {
    const { user } = this.props.auth;
    const { wall, loading } = this.props.wall;
    console.log(user);
    console.log(wall);
    let wallContent;

    if (wall === null || loading) {
      wallContent = <h4 className="center">Loading...</h4>;
    } else {
      if (Object.keys(wall).length > 0) {
        wallContent = (
          <div className="wall-container">
            <div className="Wall">{user.id}</div>
            <div className="Wall">{user.email}</div>
            <div className="Wall">{user.firstName}</div>
            <div className="Wall">{user.lastName}</div>
            {wall.img.map((image, i) => {
              return <img src={image} alt="test" className="img-wall" />;
            })}
          </div>
        );
      } else {
        // User is logged in but has no wall
        wallContent = (
          <div>
            <p className="lead text-muted">Welcome {user.firstName}</p>
            <p>You don't have any image yet</p>
          </div>
        );
      }
    }

    return <div>{wallContent}</div>;
  }
}

Wall.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  getCurrentWall: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  wall: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wall: state.wall,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentWall })(Wall);
