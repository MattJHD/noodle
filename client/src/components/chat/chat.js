import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Chat">
        <h1>Chat component</h1>
      </div>
    );
  }
}