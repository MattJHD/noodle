import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import RoomList from './roomList';
import "./createRoom.css";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      rooms: []
    };
  }

  componentDidMount() {
    let username = sessionStorage.getItem('username');
    this.setState({ username: username });
    console.log(username);

    fetch('/roomList')
      .then(res => res.json())
      // .then(rooms => this.setState({rooms: JSON.stringify(rooms)}, () => console.log('Rooms fetched', JSON.stringify({rooms})))); // This is {events: events} ES6 syntax    
      .then(rooms => this.setState(
        {rooms: rooms}, function() {
        console.log('Rooms fetched', {rooms});
        console.log(typeof({rooms}));
        console.log(typeof(this.state.rooms));
      } // This is {events: events} ES6 syntax    
      ))
  }

  render() {
    return (
      <div className="Room">
        <h1>CreateRoom page</h1>
        <form action="http://localhost:5000/canvas" method="POST">
        <input id="username" name="username" type="hidden" value={this.state.username}/>

<input id="room" name="room" type="text"/>

<button>Create Room</button>

</form>
        <RoomList rooms={this.state.rooms}/>
      </div>
    );
  }
}