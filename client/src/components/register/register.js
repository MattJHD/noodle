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
      if(data.statusText === 'OK') {
        window.location.replace("/login");
      }  
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    });
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
        <div className="whiteBackgroundRegister">
          <FormGroup controlId="firstName" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="First Name"
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Last Name"
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup controlId="passwordControl" bsSize="large">
            <FormControl
              value={this.state.passwordControl}
              onChange={this.handleChange}
              type="password"
              placeholder="Verify Password"
            />
          </FormGroup>
          <Button
            bsSize="large"
            bsStyle="info"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
          </div>
        </form>
      </div>
    );
  }
}