import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
} from 'react-router-dom';
import Nav from './components/nav/nav';
import Login from './components/login/login';
import Register from './components/register/register';
// import logo from './logo.svg';
import './App.css';


// const Page = ({ title }) => (
//   <div className="App">
    
//   </div>
// );

const Home = (props) => (
  <h1>Homepage</h1>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Cards />
        <hr /> */}
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            {/* <Route exact path='/events/:id' component={EventDetail} /> */}
            {/* <Route path='/events' component={Events} /> */}
          </div>
        </Router>
        {/* <Events />
        <SimpleMap /> */}

      </div>
    );
  }
}

export default App;
