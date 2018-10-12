import React, { Component } from "react";
import { render } from "react-dom";

import { ShortcutProvider } from "../src";

import ChildComponent from "./child";
const shortcuts = {
  TEST: {
    UP: {
      osx: "q",
      other: ["w", "up"]
    },
    DOWN: ["s", "down"],
    LEFT: ["a", "left"],
    RIGHT: ["d", "right"],
    CTRLQ: "Ctrl + q",
    ALTQ: "q + Alt",
    SHIFTQ: "shift+q",
    ALTCTRLY: "alt+ctrl+y",
    CTRLENTER: "ctrl+enter",
    DELETE: "del"
  },
  GLO: {
    GLOBAL: "p"
  }
};

class Example extends Component {
  render() {
    return (
      <ShortcutProvider withGlobals={true} shortcuts={shortcuts}>
        <div style={{ width: "100vw", height: "100vh" }}>
          Test1
          <ChildComponent test={shortcuts} text="Sample" />
        </div>
      </ShortcutProvider>
    );
  }
}

render(<Example />, document.getElementById("root"));
