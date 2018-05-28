import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWall } from "../../actions/wallActions";
// import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import "./wall.css";

import WallItem from "./wallItem";

class Wall extends Component {
  displayModal(i, e) {
    var modal = document.getElementById(i);

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById(e.target.src);
    var modalImg = document.getElementById(e.target.src + i);
    var captionText = document.getElementById("caption" + i);
    console.log(captionText);

    modal.style.display = "block";
    modalImg.src = e.target.src;
    captionText.innerHTML = e.target.alt;
  }

  closeModal(i, e) {
    var modal = document.getElementById(i);
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
  }

  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
    this.props.getCurrentWall();
  }

  render() {
    const { user } = this.props.auth;
    const { wall, loading } = this.props.wall;
    // console.log(user);
    // console.log(wall);
    let wallContent;

    if (wall === null || loading) {
      wallContent = <Spinner />;
    } else {
      if (Object.keys(wall).length > 0) {
        wallContent = (
          <div>
            <div className="sideBar">
              <div className="userInfo">
                <div className="Wall">{user.username}</div>
                <div className="Wall">
                  {user.firstName} {user.lastName}
                </div>
                <div className="Wall">{user.email}</div>
              </div>
            </div>
            <div className="wall-container">
              {wall.img.map((image, i) => {
                return (
                  <div className="img-wall">
                    <img
                      id={image}
                      src={image}
                      alt="test"
                      // onClick={this.displayModal.bind(this, i)}
                      onClick={this.displayModal.bind(this, i)}
                      className="img-hover"
                    />
                    {/* <span className="download-img"> */}
                    <a
                      className="download-img"
                      href={image}
                      download="filename.png"
                    >
                      ↓
                    </a>
                    {/* </span> */}
                    <div id={i} className="modal">
                      <span
                        className="close"
                        onClick={this.closeModal.bind(this, i)}
                      >
                        &times;
                      </span>
                      <img className="modal-content" id={image + i} />
                      <div id={"caption" + i} />
                    </div>
                  </div>
                  //{/* <a href={image} download="filename.png">
                  //<img src={image} alt="test" className="img-wall" />
                  //</a> */
                );
              })}
            </div>
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
