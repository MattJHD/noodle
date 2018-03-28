import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordControl: ""
    };
  }

  validateForm() {
    return this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.passwordControl.length > 0 && this.state.password === this.state.passwordControl;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("register", {  
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          passwordControl: this.state.passwordControl
        })
    })
    .then(function (data) {  
      console.log('Request success: ', data);  
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    });
  }

  componentDidMount() {
    fetch('/register')
      .then(res => res.json())
      .then(email => this.setState({email: email.mail}, () => console.log('Email fetched', {email}))); // This is {events: events} ES6 syntax    
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="passwordControl" bsSize="large">
            <ControlLabel>Verify Password</ControlLabel>
            <FormControl
              value={this.state.passwordControl}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}