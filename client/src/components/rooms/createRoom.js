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
      .then(rooms => this.setState(
        {rooms: rooms}, function() {
          console.log('Rooms fetched', {rooms});
        }  
      ))
  }

  render() {
    return (
      <div className="Room">
        <h1 className="Roomh1">Créer une room</h1>
        <p className="RoomP">Les rooms sont là où les membres peuvent communiquer, prendre des notes, dessiner et exporter le résultat.
          Vous pouvez rejoindre une room existante en cliquant sur son nom ou en créer une nouvelle.
        </p>
        <form action="http://localhost:5000/canvas" method="POST" className="RoomForm">
          <input id="username" name="username" type="hidden" value={this.state.username}/>
          <label className="labelRoom" htmlFor="room">Nom</label>
          <input id="room" name="room" type="text"/>
          <button className="buttonRoom">Créér room</button>
        </form>
        <RoomList rooms={this.state.rooms}/>
      </div>
    );
  }
}