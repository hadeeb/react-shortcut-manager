import React, { Component } from "react";
import PropTypes from "prop-types";

import getActionFromEvent from "../utils/actionFromEvent";
import uniqueID from "../utils/uniqueID";
import isInputLike from "../utils/isInputLike";

class Shortcuts extends Component {
  constructor(props, context) {
    super(props, context);
    const { name, global } = props;
    this.actions = this.context.shortcuts[name] || "";
    this.shortcutsHandler = this.shortcutsHandler.bind(this);
    this.uniqueID = uniqueID(name);
    if (global) {
      const {
        handler,
        stopPropagation,
        preventDefault,
        alwaysFire
      } = this.props;
      this.context.globalFunctions[this.uniqueID] = {
        name: name,
        handler: handler,
        stopPropagation: stopPropagation,
        preventDefault: preventDefault,
        alwaysFire: alwaysFire
      };
    }
  }

  componentWillUnmount() {
    delete this.context.globalFunctions[this.uniqueID];
  }

  /**
   * Handle keyboard event
   * @param {KeyboardEvent} event
   */
  shortcutsHandler(event) {
    if (typeof this.actions !== "object") return;
    const action = getActionFromEvent(this.actions, event);
    if (action) {
      const {
        handler,
        stopPropagation,
        preventDefault,
        alwaysFire
      } = this.props;
      if (!alwaysFire && isInputLike(event.target)) return;
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      handler(action, event);
    }
  }
  render() {
    const {
      children,
      name,
      tabIndex,
      stopPropagation,
      preventDefault,
      handler,
      global,
      alwaysFire,
      ...rest
    } = this.props;
    if (global) {
      return <div {...rest}>{children}</div>;
    }
    return (
      <div {...rest} tabIndex={tabIndex} onKeyDown={this.shortcutsHandler}>
        {children}
      </div>
    );
  }
}

Shortcuts.contextTypes = {
  shortcuts: PropTypes.object,
  globalFunctions: PropTypes.object
};

Shortcuts.propTypes = {
  name: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  global: PropTypes.bool,
  tabIndex: PropTypes.number,
  stopPropagation: PropTypes.bool,
  preventDefault: PropTypes.bool,
  alwaysFire: PropTypes.bool
};
Shortcuts.defaultProps = {
  global: false,
  tabIndex: 0,
  stopPropagation: false,
  preventDefault: false,
  alwaysFire: false
};

export default Shortcuts;
