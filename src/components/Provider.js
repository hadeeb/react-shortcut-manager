import React, { Component, Children } from "react";
import PropTypes from "prop-types";

import getActionFromEvent from "../utils/actionFromEvent";
class Provider extends Component {
  getChildContext() {
    return {
      shortcuts: this.shortcuts,
      globalFunctions: this.globalFunctions
    };
  }

  constructor(props, context) {
    super(props, context);
    this.shortcuts = props.shortcuts;
    this.handleGlobals = this.handleGlobals.bind(this);
    if (props.withGlobals) {
      this.globalFunctions = {};
    } else this.globalFunctions = null;
  }

  handleGlobals(event) {
    for (let key in this.globalFunctions) {
      const { name, func } = this.globalFunctions[key];
      const action = getActionFromEvent(this.shortcuts[name], event);
      if (action) {
        func(action, event);
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
