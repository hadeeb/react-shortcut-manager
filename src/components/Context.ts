import { createContext, Context as ReactContext } from "react";

import { handlerFunction, options } from "./Shortcuts";
import { Keymap } from "../utils/types";

export type contextType = {
  shortcuts: Keymap;
  globalFunctions: globalFunctionsType;
};

export type globalFunctionsType = {
  [key: string]: {
    name: string;
    handler: handlerFunction;
  } & options;
};

const Context: ReactContext<contextType> = createContext(null);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

export default Context;
