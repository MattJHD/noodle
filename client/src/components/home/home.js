import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../login/login.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("login", {  
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
    })
    .then(data => data.json())
    .then(function (data) {  
      console.log('Request success: ', data);
      console.log('user connected');
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.result.username);
      sessionStorage.setItem('email', data.result.email);
      window.location.replace("/createRoom");
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);
      alert('Invalid password or email');
      window.location.reload();  
    });
  }

  componentDidMount() {
    fetch('/login')
      .then(res => res.json())
      .then(email => this.setState({email: email.mail}, () => console.log('Email fetched', {email}))); // This is {events: events} ES6 syntax    
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <div className="whiteBackground">
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              autoFocus
              autoComplete="off"
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              autoComplete="off"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
            />
          </FormGroup>
          <Button
            bsSize="large"
            bsStyle="info"
            disabled={!this.validateForm()}
            type="submit"
          >
            Connexion
          </Button>
          </div>
        </form>
      </div>
    );
  }
}