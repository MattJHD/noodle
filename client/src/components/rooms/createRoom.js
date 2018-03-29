import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import RoomList from './roomList';
import "./createRoom.css";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Room">
        <h1>CreateRoom page</h1>
        <RoomList />
      </div>
    );
  }
}