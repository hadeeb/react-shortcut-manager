import React, { Component, Children, createRef } from "react";
import { cleanup, render, fireEvent } from "react-testing-library";

import Shortcuts from "components/Shortcuts";

import { ContextProvider } from "components/Context";
import Provider from "../../src/components/Provider";

import mockKeymap from "../__mocks__/keymap";

class MockProvider extends Component {
  render() {
    return (
      <ContextProvider
        value={{
          shortcuts: mockKeymap,
          globalFunctions: this.props.globalFunctions || {}
        }}
      >
        {Children.only(this.props.children)}
      </ContextProvider>
    );
  }
}
describe("Shortcuts", () => {
  afterEach(cleanup);
  it("should throw when name or handler props are missing", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() =>
        render(
          <MockProvider>
            <Shortcuts />
          </MockProvider>
        )
      ).toThrow();
    } finally {
      spy.mockRestore();
    }
  });
  describe("should render a div", () => {
    afterEach(cleanup);

    it("and pass any additional props to the div element", () => {
      const obj = { a: "test", b: "qwerty", c: {}, tabIndex: 5 };
      const { container } = render(
        <MockProvider>
          <Shortcuts {...obj} name="TEST" handler={jest.fn()} />
        </MockProvider>
      );
      const domEl = container.querySelector("div");
      Object.keys(obj)
        .filter(key => key !== "shortcuts" && key !== "withGlobals")
        .forEach(key => {
          expect(domEl.getAttribute(key)).toEqual(`${obj[key]}`);
        });
    });

    it("and apply ref to the div element", () => {
      const ref = createRef();
      const { container } = render(
        <MockProvider>
          <Shortcuts name="TEST" handler={jest.fn()} ref={ref} />
        </MockProvider>
      );
      const domEl = container.querySelector("div");
      expect(domEl).toEqual(ref.current);
    });
  });

  it("should call handler on keydown", () => {
    const spy = jest.fn();
    const { getByText } = render(
      <MockProvider>
        <Shortcuts name="NAV" handler={spy}>
          <div>test</div>
        </Shortcuts>
      </MockProvider>
    );
    fireEvent.keyDown(getByText(/^test/), { keyCode: 38 });
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(getByText(/^test/), { keyCode: 39 });
    expect(spy).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(getByText(/^test/), { keyCode: 39, shiftKey: true });
    expect(spy).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(getByText(/^test/), { keyCode: 50 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should add handler to globalFunctions when global={true} and remove on unmount", () => {
    const spy = jest.fn();
    const testObj = {};
    render(
      <MockProvider globalFunctions={testObj}>
        <div>
          <div>test</div>
          <Shortcuts name="NAV" handler={spy} global={true}>
            <div>taest</div>
          </Shortcuts>
        </div>
      </MockProvider>
    );

    let keys = Object.keys(testObj);
    expect(keys).toHaveLength(1);
    expect(testObj[keys[0]].handler).toEqual(spy);
    cleanup();
    keys = Object.keys(testObj);
    expect(keys).toHaveLength(0);
  });

  it("should call handler on keydown on any child for global", () => {
    const spy = jest.fn();
    const { getByText } = render(
      <Provider shortcuts={mockKeymap} withGlobals={true}>
        <div>
          <div>test</div>
          <div>2nd Child</div>
          <Shortcuts name="NAV" handler={spy} global={true}>
            <div>Inner Child</div>
          </Shortcuts>
        </div>
      </Provider>
    );
    fireEvent.keyDown(getByText(/^test/), { keyCode: 38 });
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(getByText(/^test/), { keyCode: 39 });
    expect(spy).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(getByText(/^test/), { keyCode: 50 });
    expect(spy).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(getByText(/^2nd/), { keyCode: 39 });
    expect(spy).toHaveBeenCalledTimes(3);
    fireEvent.keyDown(getByText(/^2nd/), { keyCode: 99 });
    expect(spy).toHaveBeenCalledTimes(3);
    fireEvent.keyDown(getByText(/^2nd/), { keyCode: 199 });
    expect(spy).toHaveBeenCalledTimes(3);
    fireEvent.keyDown(getByText(/^Inner/), { keyCode: 39 });
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
