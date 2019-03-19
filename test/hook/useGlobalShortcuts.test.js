import React, { Component, Children, createRef } from "react";
import { cleanup, render, fireEvent } from "react-testing-library";

import { MockProvider } from "../components/Shortcuts.test";
import mockKeymap from "../__mocks__/keymap";

import Provider from "components/Provider";
import useGlobalShortcuts from "hook/useGlobalShortcuts";

function DummyComp({ useHook }) {
  useHook();
  return <div>test component</div>;
}

describe("useGlobalShortcuts", () => {
  afterEach(cleanup);
  it("should throw when name or handler props are missing", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() =>
        render(
          <Provider shortcuts={mockKeymap}>
            <DummyComp useHook={() => useGlobalShortcuts()} />
          </Provider>
        )
      ).toThrow();
    } finally {
      spy.mockRestore();
    }
  });

  it("should throw when withGlobals=false", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const handler = jest.fn();
    try {
      expect(() =>
        render(
          <Provider shortcuts={mockKeymap}>
            <DummyComp useHook={() => useGlobalShortcuts("NAV", handler)} />
          </Provider>
        )
      ).toThrow();
    } finally {
      spy.mockRestore();
    }
  });

  it("should add handler to globalFunctions and remove on unmount", () => {
    const spy = jest.fn();
    const testObj = {};
    render(
      <MockProvider globalFunctions={testObj}>
        <div>
          <div>test</div>
          <DummyComp useHook={() => useGlobalShortcuts("NAV", spy)} />
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

  it("should call handler on keydown", () => {
    const spy = jest.fn();
    const { getByText } = render(
      <Provider shortcuts={mockKeymap} withGlobals={true}>
        <DummyComp useHook={() => useGlobalShortcuts("NAV", spy)} />
      </Provider>
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
});
