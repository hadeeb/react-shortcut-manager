import React, { PureComponent, forwardRef } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import getActionFromEvent from "../utils/actionFromEvent";
import uniqueID from "../utils/uniqueID";
import isInputLike from "../utils/isInputLike";

import { ContextConsumer } from "./Context";

class Shortcuts extends PureComponent {
  constructor(props, context) {
    super(props, context);
    const { name, global, shortcuts, globalFunctions } = props;
    this.actions = shortcuts[name] || "";
    this.shortcutsHandler = this.shortcutsHandler.bind(this);
    this.uniqueID = uniqueID(name);
    invariant(
      !global || globalFunctions,
      `To use global shortcuts,` +
        ` The root Provider component should have a prop withGlobal={true}`
    );
    if (global) {
      const {
        handler,
        stopPropagation,
        preventDefault,
        alwaysFire
      } = this.props;
      globalFunctions[this.uniqueID] = {
        name: name,
        handler: handler,
        stopPropagation: stopPropagation,
        preventDefault: preventDefault,
        alwaysFire: alwaysFire
      };
    }
  }

  componentWillUnmount() {
    delete this.props.globalFunctions[this.uniqueID];
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
      forwardedRef,
      shortcuts,
      globalFunctions,
      ...rest
    } = this.props;
    if (global) {
      return (
        <div {...rest} ref={forwardedRef}>
          {children}
        </div>
      );
    }
    return (
      <div
        {...rest}
        tabIndex={tabIndex}
        onKeyDown={this.shortcutsHandler}
        ref={forwardedRef}
      >
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
  shortcuts: PropTypes.object.isRequired,
  globalFunctions: PropTypes.object,
  name: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  global: PropTypes.bool,
  tabIndex: PropTypes.number,
  stopPropagation: PropTypes.bool,
  preventDefault: PropTypes.bool,
  alwaysFire: PropTypes.bool,
  forwardedRef: PropTypes.object
};
Shortcuts.defaultProps = {
  global: false,
  tabIndex: 0,
  stopPropagation: false,
  preventDefault: false,
  alwaysFire: false
};

export default forwardRef((props, ref) => {
  return (
    <ContextConsumer>
      {({ shortcuts, globalFunctions }) => (
        <Shortcuts
          {...props}
          forwardedRef={ref}
          shortcuts={shortcuts}
          globalFunctions={globalFunctions}
        >
          {props.children}
        </Shortcuts>
      )}
    </ContextConsumer>
  );
});
