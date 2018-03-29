import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
import './nav.css';

function Nav(props) {
  return (
    <div>
      <div className="App-header">
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="createRoom">Create room</Link>
        {/* <Link to={`/room/${props.room.id}`}>Room</Link> */}
      </div>
    </div>
  );
}


export default Nav;