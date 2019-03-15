import React, {
  Component,
  createRef,
  Children,
  cloneElement,
  forwardRef
} from "react";
import { Shortcuts } from "../src";

/**
 * https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
 */
const modes = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
  BOTH: "BOTH"
};
class ArrowNav extends Component {
  constructor(props) {
    super(props);
    this.childRef = props.childRef || createRef();
    this.handleKeys = this.handleKeys.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = { active: 0 };
  }

  handleKeys(action, event) {
    event.preventDefault();
    const { children, mode = modes.VERTICAL } = this.props;
    const count = Children.toArray(children).filter(Boolean).length;
    if (!count) return;
    switch (action) {
      case "UP":
        if (mode === modes.BOTH || mode === modes.VERTICAL) {
          this.setState(({ active }) => ({
            active: (active - 1 + count) % count
          }));
        }
        break;
      case "DOWN":
        if (mode === modes.BOTH || mode === modes.VERTICAL) {
          this.setState(({ active }) => ({
            active: (active + 1) % count
          }));
        }
        break;
      case "LEFT":
        if (mode === modes.BOTH || mode === modes.HORIZONTAL) {
          this.setState(({ active }) => ({
            active: (active - 1 + count) % count
          }));
        }
        break;
      case "RIGHT":
        if (mode === modes.BOTH || mode === modes.HORIZONTAL) {
          this.setState(({ active }) => ({
            active: (active + 1) % count
          }));
        }
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
   */
  onClick(e) {
    if (e.target !== e.currentTarget) {
      const clickOrigin = Array.from(this.childRef.current.children).findIndex(
        c => c.contains(e.target)
      );
      if (clickOrigin > -1) this.setState({ active: clickOrigin });
      else console.log("unknown item clicked");
    }
  }

  renderChildren() {
    const { children, activeClassName } = this.props;
    const { active } = this.state;
    return Children.map(children, (child, index) => {
      return (
        <ClonedChild
          child={child}
          index={index}
          active={active}
          activeClassName={activeClassName}
        />
      );
    });
  }

  callOnFocus() {
    const { active } = this.state;
    const { onItemFocus, children } = this.props;
    const count = Children.toArray(children).filter(Boolean).length;
    if (onItemFocus && count > active) onItemFocus(active);
  }

  componentDidUpdate(_, { active: prevActive }) {
    const { active } = this.state;

    if (prevActive !== active) {
      if (this.childRef.current.children.length > active) {
        this.callOnFocus();
        this.childRef.current.children[active].focus();
      }
    }
  }

  render() {
    const {
      children,
      onItemFocus,
      mode,
      tabIndex = -1,
      activeClassName,
      childRef,
      onClick,
      ...rest
    } = this.props;

    return (
      <Shortcuts
        {...rest}
        ref={this.childRef}
        name="ARROW_NAV"
        handler={this.handleKeys}
        tabIndex={tabIndex}
        onClick={this.onClick}
      >
        {this.renderChildren()}
      </Shortcuts>
    );
  }
}

function ClonedChild({ child, active, index, activeClassName }) {
  if (!child) return null;
  return cloneElement(child, {
    tabIndex: active === index ? Math.max(0, child.props.tabIndex || 0) : -1,
    className: cx({
      [activeClassName]: active === index,
      [child.props.className]: child.props.className !== void 0
    })
  });
}

const Wrapper = forwardRef((props, ref) => (
  <ArrowNav {...props} childRef={ref} />
));

Wrapper.mode = modes;

export default Wrapper;

function cx(obj) {
  return Object.keys(obj)
    .map(cls => (obj[cls] ? cls : ""))
    .filter(Boolean)
    .join(" ");
}
