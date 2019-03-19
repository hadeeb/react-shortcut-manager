import { useContext, useRef, useEffect } from "react";
import invariant from "invariant";

import uniqueID from "../utils/uniqueID";
import context from "../components/Context";

import { handlerFunction, options } from "../components/Shortcuts";

export default function useGlobalShortcuts(
  name: string,
  handler: handlerFunction,
  options?: options
) {
  invariant(name && handler, `name and handler props should have valid values`);
  const { globalFunctions } = useContext(context);
  invariant(
    globalFunctions,
    `To use global shortcuts,` +
      ` The root Provider component should have a prop withGlobals={true}`
  );
  const id = useRef(uniqueID(name));
  useEffect(() => {
    globalFunctions[id.current] = {
      name: name,
      handler: handler,
      ...options
    };
    return () => delete globalFunctions[id.current];
  }, [name, handler, options]);
}
