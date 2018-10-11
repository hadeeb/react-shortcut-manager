import React, { Component } from "react";
import { Shortcuts } from "../src";

class TestComponent extends Component {
  handle_keys(action, event) {
    console.log(action);
  }
  render() {
    return (
      <Shortcuts name="GLO" handler={this.handle_keys} global={true}>
        <div>zxcv</div>
        <div>asdf</div>
      </Shortcuts>
    );
  }
}

export default TestComponent;
