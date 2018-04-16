import React, { Component } from "react";
import WallItem from './wallItem';

export default class Wall extends Component {
  render() {
    return (
      <div className="Wall">
        <h1>Wall page</h1>
        <WallItem />
      </div>
    );
  }
}