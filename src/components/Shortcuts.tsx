import React, {
  PureComponent,
  forwardRef,
  Ref,
  KeyboardEvent,
  ReactNode,
  Children
} from "react";

import invariant from "invariant";

import getActionFromEvent from "../utils/actionFromEvent";
import uniqueID from "../utils/uniqueID";
import isInputLike from "../utils/isInputLike";

import { ContextConsumer, contextType } from "./Context";

export type handlerFunction = (
  action: string,
  event: KeyboardEvent<HTMLElement>
) => void;

export type options = {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  alwaysFire?: boolean;
};

type ShortcutsProps = {
  name: string;
  handler: handlerFunction;
  children: ReactNode;
  global?: boolean;
  headless?: boolean;
  tabIndex?: number;
};

type InternalProps = ShortcutsProps &
  contextType &
  options & {
    forwardedRef: Ref<HTMLDivElement>;
  };
class Shortcuts extends PureComponent<InternalProps> {
  actions: Object;
  uniqueID: string;

  static defaultProps = {
    global: false,
    headless: false,
    tabIndex: 0,
    stopPropagation: false,
    preventDefault: false,
    alwaysFire: false
  };

  constructor(props: InternalProps) {
    super(props);
    const { name, handler, global, shortcuts, globalFunctions } = props;
    invariant(
      name && handler,
      `name and handler props should have valid values`
    );
    this.actions = shortcuts[name] || {};
    this.shortcutsHandler = this.shortcutsHandler.bind(this);
    this.uniqueID = uniqueID(name);
    invariant(
      !global || globalFunctions,
      `To use global shortcuts,` +
        ` The root Provider component should have a prop withGlobals={true}`
    );
    if (global) {
      const { stopPropagation, preventDefault, alwaysFire } = props;
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
  shortcutsHandler(event: KeyboardEvent<HTMLDivElement>) {
    const action = getActionFromEvent(this.actions, event);
    if (action) {
      const {
        handler,
        stopPropagation,
        preventDefault,
        alwaysFire
      } = this.props;
      if (!alwaysFire && isInputLike(event.target as HTMLElement)) return;
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
      headless,
      alwaysFire,
      forwardedRef,
      shortcuts,
      globalFunctions,
      ...rest
    } = this.props;
    if (global) {
      if (headless) return Children.only(children);
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

export default forwardRef<HTMLDivElement, ShortcutsProps & options>(
  (props, ref) => {
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
  }
);
