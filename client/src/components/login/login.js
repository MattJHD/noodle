import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false
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
    .then(function (data) {  
      console.log('Request success: ', data);
      if(data.status == "200" && data.statusText === 'OK'){
        console.log('user connected');
        this.setState({loggedIn: true});
        window.location.replace("/createRoom");
      } else if (data.status == "500") {
        console.log('user refused');
      }
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    });
  }


  // handleSubmit = event => {
  //   event.preventDefault();
  //   fetch("login", {  
  //     method: 'POST',  
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },  
  //     body: JSON.stringify({
  //         name: 'dean',
  //         login: 'dean'
  //       })
  //   })
  //   .then(function (data) {  
  //     console.log('Request success: ', data);  
  //   })  
  //   .catch(function (error) {  
  //     console.log('Request failure: ', error);  
  //   });
  // }

  componentDidMount() {
    fetch('/login')
      .then(res => res.json())
      .then(email => this.setState({email: email.mail}, () => console.log('Email fetched', {email}))); // This is {events: events} ES6 syntax    
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
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