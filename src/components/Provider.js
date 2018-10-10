import { Component, Children } from "react";
import PropTypes from "prop-types";

export function createProvider(contextKey = "shortcuts") {
  class Provider extends Component {
    getChildContext() {
      return { [contextKey]: this[contextKey] };
    }

    constructor(props, context) {
      super(props, context);
      this[contextKey] = props.shortcuts;
    }

    render() {
      return Children.only(this.props.children);
    }
  }
  Provider.propTypes = {
    shortcuts: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };
  Provider.childContextTypes = {
    [contextKey]: PropTypes.object.isRequired
  };
  return Provider;
}

export default createProvider();
