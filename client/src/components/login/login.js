import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Nav from '../nav/nav';

class Login extends Component {
  constructor() {
    // We need to call super() because this component is embed in a parent component
    super();
    // We have our customers in our state
    this.state = {
      events: [],
    }
  }

  // It runs automatically when the component mounted
  componentDidMount() {
    fetch('/login')
      .then(res => res.json())
      .then(events => this.setState({events: events}, () => console.log('Events fetched', {events}))); // This is {events: events} ES6 syntax    
  }
  // filterList(searchValue){
  //   var updatedList = this.state.events;
  //   console.log(updatedList);

  //   updatedList = updatedList.filter((item) => {
  //     console.log(searchValue.nativeEvent.target.value, item.recordid);
      
  //     if (item.fields.hasOwnProperty('title')) {
  //     return (
  //       (item.recordid.toLowerCase().search(searchValue.nativeEvent.target.value.toLowerCase()) !== -1)) 
  //       || 
  //       (item.fields.title.toLowerCase().search(searchValue.nativeEvent.target.value.toLowerCase()) !== -1)
  //       || 
  //       (item.fields.city.toLowerCase().search(searchValue.nativeEvent.target.value.toLowerCase()) !== -1);
  //     } else {
  //       return (
  //         (item.recordid.toLowerCase().search(searchValue.nativeEvent.target.value.toLowerCase()) !== -1)) 
  //         || 
  //         (item.fields.city.toLowerCase().search(searchValue.nativeEvent.target.value.toLowerCase()) !== -1);
  //     }

  //     // return item.recordid === searchValue.nativeEvent.target.value;
  //   });
  //   console.log(updatedList);
  //   this.setState({filteredEvents: updatedList});
  // }

  render() {   
    return (
      <div>
        {/* <Nav  title="Events" /> */}
        <div className="container">
          {/* <form>
            <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={evt => this.filterList(evt)}/>
            </fieldset>
          </form>
          {this.state.filteredEvents.map((event, i) => {
            return( 
            <div key={event.recordid}>
              <Event event={event} />
            </div>
            )}
          )} */}
            <h2>Login component</h2>
            <p></p>
        </div>
      </div>
    )
  }
}

export default Login;
