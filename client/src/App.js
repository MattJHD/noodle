import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
} from 'react-router-dom';
import Nav from './components/nav/nav';
import Login from './components/login/login';
import Home from './components/home/home';
import Register from './components/register/register';
import Room from './components/rooms/room';
import CreateRoom from './components/rooms/createRoom';
import Wall from './components/wall/wall';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/createRoom' component={CreateRoom} />
            <Route exact path='/wall' component={Wall} />
            <Route exact path='/rooms/:id' component={Room} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
