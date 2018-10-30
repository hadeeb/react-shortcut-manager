import React from "react";
import { cleanup, render } from "react-testing-library";
import Context from "components/Context";
import "jest-dom/extend-expect";

const { Provider, Consumer } = Context;

describe("Context", () => {
  afterEach(cleanup);

  it("should provide null as default value", () => {
    const { getByText } = render(
      <Consumer>{val => <div>iden {val}</div>}</Consumer>
    );

    expect(getByText(/^iden/)).toHaveTextContent(/^iden$/);
  });

  it("should provide value given to consumer", () => {
    const { getByText } = render(
      <Provider value="testString">
        <Consumer>{val => <div>iden {val}</div>}</Consumer>
      </Provider>
    );

    expect(getByText(/^iden/)).toHaveTextContent("iden testString");
  });
});
