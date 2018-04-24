import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./roomList.css";

export default class RoomList extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     rooms: []
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: ''
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   fetch('/roomList')
  //     .then(res => res.json())
  //     .then(rooms => this.setState({rooms: JSON.stringify(rooms)}, () => console.log('Rooms fetched', JSON.stringify({rooms})))); // This is {events: events} ES6 syntax    
  // }

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

  // handleSubmit = event => {
  //   event.preventDefault();
  //   fetch("http://localhost:5000/canvas", {  
  //     method: 'POST',  
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },  
  //     body: JSON.stringify({
  //         username: this.state.username,
  //         room: "sport"
  //       })
  //   })
  //   .then(data => data.json())
  //   .then(function (data) {  
  //     console.log('Request success: ', data);
  //     // if(data.status == "200" && data.statusText === 'OK'){
  //       console.log('ok');
  //   })  
  //   .catch(function (error) {  
  //     console.log('Request failure: ', error);
  //   });
  // }

  // handleSubmit(event) {
  //   // event.preventDefault();
  //   // const data = new FormData(event.target);
  //   console.log((event.target)[0].value);
  //   // console.log(data);
  //   // console.log(JSON.stringify(data));
  //   let username = (event.target)[0].value;
  //   let room = (event.target)[1].value;
  //   fetch('http://localhost:5000/canvas', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },  
  //     body: JSON.stringify({
  //         username: username,
  //         room: room
  //       })
  //   })
  // }

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
                {/* <li key={room}>
                
                  {room}
                </li> */}
                
                <input id="username" name="username" type="hidden" value={this.state.username}/>

                <input id="room" name="room" type="hidden" value={room}/>

                <button className="button-list">{room}</button>
              
              </form>
            )}
          )}
          </ul>
        </div>
          </div>
          {/* {this.props.rooms} */}
      </div>
    );
  }
}