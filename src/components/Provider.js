import React, { Component, Children } from "react";
import PropTypes from "prop-types";

import getActionFromEvent from "../utils/actionFromEvent";
import getShortcutsofPlatform from "../utils/getShortcutsofPlatform";
import isInputLike from "../utils/isInputLike";

class Provider extends Component {
  getChildContext() {
    return {
      shortcuts: this.shortcuts,
      globalFunctions: this.globalFunctions
    };
  }

  constructor(props, context) {
    super(props, context);
    this.shortcuts = getShortcutsofPlatform(props.shortcuts);
    this.handleGlobals = this.handleGlobals.bind(this);
    if (props.withGlobals) {
      this.globalFunctions = {};
    } else this.globalFunctions = null;
  }
  /**
   * Handle global keyboard event
   * @param {KeyboardEvent} event
   */
  handleGlobals(event) {
    for (let key in this.globalFunctions) {
      const { name } = this.globalFunctions[key];
      const action = getActionFromEvent(this.shortcuts[name], event);
      if (action) {
        const {
          handler,
          stopPropagation,
          preventDefault,
          alwaysFire
        } = this.globalFunctions[key];
        if (!alwaysFire && isInputLike(event.target)) return;
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        handler(action, event);
      }
    }
  }

  render() {
    const { withGlobals, shortcuts, tabIndex, ...rest } = this.props;
    if (withGlobals) {
      return (
        <div {...rest} tabIndex={tabIndex} onKeyDown={this.handleGlobals}>
          {Children.only(this.props.children)}
        </div>
      );
    }
    return Children.only(this.props.children);
  }
}
Provider.propTypes = {
  shortcuts: PropTypes.object.isRequired,
  withGlobals: PropTypes.bool,
  tabIndex: PropTypes.number
};
Provider.defaultProps = {
  withGlobals: false,
  tabIndex: 0
};
Provider.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
  globalFunctions: PropTypes.object
};

export default Provider;
