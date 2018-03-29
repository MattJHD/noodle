import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./roomList.css";

export default class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    fetch('/roomList')
      .then(res => res.json())
      .then(rooms => this.setState({rooms: rooms}, () => console.log('Rooms fetched', {rooms}))); // This is {events: events} ES6 syntax    
  }

  render() {
    return (
      <div className="RoomList">
        <h1>RoomList component</h1>
      </div>
    );
  }
}