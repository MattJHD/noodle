import React, { Component } from "react";
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
import './nav.css';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      open: false
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    this.setState({ token: token });
  }
  
  toggleMenu () {
    this.setState({open: !this.state.open });
  }

  logout () {
    sessionStorage.clear();
    window.location.reload();
  }

  render() {

    const content = this.state.token ? (
      <div className="align-left">
         <div className={this.state.open 
           ? "menu-wrapper menu-open" 
           : "menu-wrapper"}>
          <div id="menu">
            <ul className="link-list">
                <li><Link to="/" open={this.state.open} >Home</Link></li>
                <li><Link to="/login" open={this.state.open} >Login</Link></li>
                <li><Link to="createRoom" open={this.state.open} >Create room</Link></li>
                <li><Link to="wall" open={this.state.open} >Wall</Link></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
             </ul> 
            </div>
        </div>
        <button className={this.state.open ? "menu-toggle close-button" 
          : "menu-toggle "} onClick={this.toggleMenu.bind(this)}>X</button>
      </div> 
    ) : (
      <div className="align-left">
        <div className={this.state.open 
           ? "menu-wrapper menu-open" 
           : "menu-wrapper"}>
          <div id="menu">
            <ul className="link-list">
              <li><Link to="/" open={this.state.open}>Home</Link></li>
              <li><Link to="/login" open={this.state.open} >Login</Link></li>
              <li><Link to="/register" open={this.state.open} >Register</Link></li>
            </ul>
          </div>
        </div>
        <button className={this.state.open ? "menu-toggle close-button" 
          : "menu-toggle "} onClick={this.toggleMenu.bind(this)}>X</button>
      </div> 
    );

    return (
      <div>
         {content}
      </div>
    );
  }
}