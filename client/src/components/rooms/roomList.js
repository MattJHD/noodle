import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./roomList.css";

export default class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: ''
    };
  }

  componentDidMount() {
    let username = sessionStorage.getItem('username');
    this.setState({ username: username });
    console.log(username);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div className="RoomList">
        <div className="RoomContainer">
          <h1>Rooms</h1>
          <div>
            <ul className="customUl">
              {this.props.rooms.map((room, i) => {
                return( 
                  <form action="http://localhost:5000/canvas" method="POST">
                    <input id="username" name="username" type="hidden" value={this.state.username}/>
                    <input id="room" name="room" type="hidden" value={room}/>
                    <button className="button-list">{room}</button>
                  </form>
                  )}
                )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}