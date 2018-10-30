import React, { Component, Children } from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import Shortcuts from "../../src/components/Shortcuts";
import { ContextProvider } from "../../src/components/Context";

import mockKeymap from "../__mocks__/keymap";

class MockProvider extends Component {
  render() {
    return (
      <ContextProvider
        value={{
          shortcuts: mockKeymap,
          globalFunctions: {}
        }}
      >
        {Children.only(this.props.children)}
      </ContextProvider>
    );
  }
}

describe("Shortcuts", () => {
  describe("should render a div", () => {
    afterEach(cleanup);
    it("with warnings when there are no warnings", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      try {
        const { container } = render(
          <MockProvider>
            <Shortcuts /* name="" handler={jest.fn()} */ />
          </MockProvider>
        );
        expect([].slice.call(container.querySelectorAll("div"))).toHaveLength(
          1
        );
        // 2 required props are missing
        expect(spy).toHaveBeenCalledTimes(2);
      } finally {
        spy.mockRestore();
      }
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
    fireEvent.keyDown(getByText(/^test/), { keyCode: 50 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
