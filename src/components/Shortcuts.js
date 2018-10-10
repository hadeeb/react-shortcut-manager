import React, { Component } from "react";
import PropTypes from "prop-types";

import getActionFromEvent from "../utils/actionFromEvent";

export function createShortcuts(contextKey = "shortcuts") {
  class Shortcuts extends Component {
    constructor(props, context) {
      super(props, context);
      const { name = "" } = props;
      this.actions = this.context[contextKey][name] || "";
      this.shortcutsHandler = this.shortcutsHandler.bind(this);
    }

    shortcutsHandler(event) {
      if (typeof this.actions !== "object") return;
      const action = getActionFromEvent(this.actions, event);
      if (action) {
        const { handler, stopPropagation } = this.props;
        if (stopPropagation) event.stopPropagation();
        handler(action, event);
      }
    }
    render() {
      const { children, tabIndex, ...rest } = this.props;
      return (
        <div {...rest} tabIndex={tabIndex} onKeyUp={this.shortcutsHandler}>
          {children}
        </div>
      );
    }
  }

  Shortcuts.contextTypes = {
    [contextKey]: PropTypes.object
  };

  Shortcuts.propTypes = {
    tabIndex: PropTypes.number,
    stopPropagation: PropTypes.bool
  };
  Shortcuts.defaultProps = {
    tabIndex: 0,
    stopPropagation: true
  };

  return Shortcuts;
}

export default createShortcuts();
