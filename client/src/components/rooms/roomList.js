import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./roomList.css";

class RoomList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="RoomList">
        <div className="RoomContainer">
          <h1>Rooms</h1>
          <div>
            <ul className="customUl">
              {this.props.rooms.map((room, i) => {
                return (
                  <form
                    action="http://localhost:5000/canvas"
                    method="POST"
                    key={i}
                  >
                    <input
                      id="username"
                      name="username"
                      type="hidden"
                      value={user.username}
                    />
                    <input id="room" name="room" type="hidden" value={room} />
                    <button className="button-list">{room}</button>
                  </form>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RoomList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(RoomList);
