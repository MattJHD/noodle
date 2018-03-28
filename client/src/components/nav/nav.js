import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import logo from '../../logo.svg';
import './nav.css';

function Nav(props) {
  return (
    <div>
      <div className="App-header">
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {/* <nav> */}
          {/* <div>
              <Link to="/">Home</Link>
              
          </div>
          <div>
              <Link to="/events">Events</Link>
              
          </div> */}
		    {/* </nav> */}
      </div>
    </div>
  );
}


export default Nav;