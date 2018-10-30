import React from "react";
import { cleanup, render } from "react-testing-library";
import Provider from "../../src/components/Provider";

describe("Provider", () => {
  afterEach(cleanup);

  it("should enforce single child", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() =>
        render(
          <Provider shortcuts={{}}>
            <div />
          </Provider>
        )
      ).not.toThrow();

      expect(() => render(<Provider shortcuts={{}} />)).toThrow(
        /a single React element child/
      );
      expect(spy).toHaveBeenCalledTimes(2);
    } finally {
      spy.mockRestore();
    }
  });

  it("should not render any additional dom elements by default", () => {
    const { container } = render(
      <Provider shortcuts={{}}>
        <div />
      </Provider>
    );
    expect([].slice.call(container.querySelectorAll("div"))).toHaveLength(1);
  });

  describe("withGlobals=true", () => {
    it("should render an additional div element", () => {
      const { container } = render(
        <Provider shortcuts={{}} withGlobals={true}>
          <div />
        </Provider>
      );
      expect([].slice.call(container.querySelectorAll("div"))).toHaveLength(2);
    });

    it("should pass any additional props to the div element", () => {
      const obj = { a: "test", b: "qwerty", c: {}, tabIndex: 5 };
      const { container } = render(
        <Provider shortcuts={{}} withGlobals={true} {...obj}>
          <div />
        </Provider>
      );
      const domEl = container.querySelector("div");
      Object.keys(obj)
        .filter(key => key !== "shortcuts" && key !== "withGlobals")
        .forEach(key => {
          expect(domEl.getAttribute(key)).toEqual(`${obj[key]}`);
        });
    });
  });
});
