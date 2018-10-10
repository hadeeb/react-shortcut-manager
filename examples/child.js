import React, { Component } from "react";
import { Shortcuts } from "../src";
class ChildComponent extends Component {
  constructor() {
    super();
    this.state = {
      letter: "QWERTYUIOP",
      count: 0
    };
    this.handle_keys = this.handle_keys.bind(this);
  }
  handle_keys(action, event) {
    this.setState(function(prev) {
      return { letter: action, count: prev.count + 1 };
    });
  }
  render() {
    return (
      <Shortcuts
        name="TEST"
        handler={this.handle_keys}
        style={{ width: "100%", height: "100%" }}
      >
        <div>{this.state.count}</div>
        <div>{this.state.letter}</div>
      </Shortcuts>
    );
  }
}

export default ChildComponent;
