import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import Login from './components/login/login';
// import Register from './components/register/register';
// import Home from "./components/home/home";
import Landing from "./components/layout/Landing";
import Room from "./components/rooms/room";
import CreateRoom from "./components/rooms/createRoom";
import Wall from "./components/wall/wall";

import "./App.css";

// Check for token
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);
  // Decode the token and get user info and expiration
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/createRoom" component={CreateRoom} />
              <Route exact path="/wall" component={Wall} />
              <Route exact path="/rooms/:id" component={Room} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
