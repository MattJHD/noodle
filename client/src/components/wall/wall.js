import React, { Component } from "react";
import WallItem from './wallItem';

export default class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {token: ''};
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    this.setState({ token: token });
    console.log(token);
  }


  // isLoggedIn() {
  //   return (
  //     <div>
  //       <h1>Wall page</h1>
  //       {/* <WallItem /> */}
  //     </div> 
  //   ) 
  // }
  // isNotLoggedIn() {
  //   return (
  //     <div>
  //       <h1>Please Log in</h1>
  //     </div> 
  //   ) 
  // }
  render() {
    console.log(this.state.token);
    const content = this.state.token ? (
      <div>
         <h1>Wall page</h1>
         {/* <WallItem /> */}
      </div> 
    ) : (
      <div>
        <h1>Please Log in</h1>
      </div> 
    );
    return (
      <div className="Wall">
        {content}
      </div>
    );
  }
}