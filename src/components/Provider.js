import React, { Component, Children } from "react";
import PropTypes from "prop-types";

import getActionFromEvent from "../utils/actionFromEvent";
import getShortcutsofPlatform from "../utils/getShortcutsofPlatform";
import isInputLike from "../utils/isInputLike";

import { ContextProvider } from "./Context";

class Provider extends Component {
  constructor(props) {
    super(props);
    this.shortcuts = getShortcutsofPlatform(props.shortcuts);
    this.handleGlobals = this.handleGlobals.bind(this);
    if (props.withGlobals) {
      this.globalFunctions = {};
    } else this.globalFunctions = null;

    this.contextValue = {
      shortcuts: this.shortcuts,
      globalFunctions: this.globalFunctions
    };
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
          <ContextProvider value={this.contextValue}>
            {Children.only(this.props.children)}
          </ContextProvider>
        </div>
      );
    }
    return (
      <ContextProvider value={this.contextValue}>
        {Children.only(this.props.children)}
      </ContextProvider>
    );
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

export default Provider;
