import React, { Component, Children, KeyboardEvent, HTMLProps } from "react";

import getActionFromEvent from "../utils/actionFromEvent";
import getShortcutsofPlatform from "../utils/getShortcutsofPlatform";
import isInputLike from "../utils/isInputLike";

import { ContextProvider } from "./Context";

import { Keymap } from "../utils/types";
import { contextType, globalFunctionsType } from "./Context";

export type ProviderProps = {
  shortcuts: Keymap;
  withGlobals?: boolean;
};

class Provider extends Component<ProviderProps & HTMLProps<HTMLDivElement>> {
  shortcuts: Keymap;
  globalFunctions: globalFunctionsType;
  contextValue: contextType;

  static defaultProps = {
    withGlobals: false,
    tabIndex: 0
  };

  constructor(props: ProviderProps) {
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
  handleGlobals(event: KeyboardEvent<HTMLElement>) {
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
        if (!alwaysFire && isInputLike(event.target as HTMLElement)) return;
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        handler(action, event);
      }
    }
  }

  render() {
    const { withGlobals, shortcuts, tabIndex, children, ...rest } = this.props;
    if (withGlobals) {
      return (
        <ContextProvider value={this.contextValue}>
          <div {...rest} tabIndex={tabIndex} onKeyDown={this.handleGlobals}>
            {Children.only(children)}
          </div>
        </ContextProvider>
      );
    }
    return (
      <ContextProvider value={this.contextValue}>
        {Children.only(children)}
      </ContextProvider>
    );
  }
}

export default Provider;
