import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import RoomList from "./roomList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./createRoom.css";

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    console.log(this.props.auth.user);
    fetch("/api/rooms/roomList")
      .then(res => res.json())
      .then(rooms =>
        this.setState({ rooms: rooms }, function() {
          console.log("Rooms fetched", { rooms });
        })
      );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(user);
    return (
      <div className="Room">
        <h1 className="Roomh1">Créer une room</h1>
        <p className="RoomP">
          Les rooms sont là où les membres peuvent communiquer, prendre des
          notes, dessiner et exporter le résultat. Vous pouvez rejoindre une
          room existante en cliquant sur son nom ou en créer une nouvelle.
        </p>
        <form
          action="http://localhost:5000/canvas"
          method="POST"
          className="RoomForm"
        >
          <input
            id="username"
            name="username"
            type="hidden"
            value={user.username}
          />
          <label className="labelRoom" htmlFor="room">
            Nom
          </label>
          <input id="room" name="room" type="text" />
          <button className="buttonRoom">Créér room</button>
        </form>
        <RoomList rooms={this.state.rooms} />
      </div>
    );
  }
}

CreateRoom.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(CreateRoom);
