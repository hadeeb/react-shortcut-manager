import React, { Component } from "react";
import { render } from "react-dom";

import { ShortcutProvider } from "../src";

import ChildComponent from "./child";
const shortcuts = {
  TEST: {
    UP: {
      osx: "q",
      other: "e"
    },
    DOWN: "s",
    LEFT: "a",
    RIGHT: ["d", "f"],
    CTRLQ: "Ctrl + q",
    ALTQ: "q + Alt",
    SHIFTQ: "shift+q",
    ALTCTRLY: "alt+ctrl+y",
    SPKEY: "/"
  },
  GLO: {
    GLOBAL: "p"
  }
};

class Example extends Component {
  render() {
    return (
      <ShortcutProvider withGlobals={true} shortcuts={shortcuts}>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
          Test1
          <ChildComponent test={shortcuts} text="Sample" />
        </div>
      </ShortcutProvider>
    );
  }
}

render(<Example />, document.getElementById("root"));
