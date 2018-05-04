import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../login/login.css";
import Login from '../login/login'

export default class Home extends Component {
  render() {
    return (
      <Login/>
    );
  }
}