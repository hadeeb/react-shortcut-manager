import { createContext, Context as ReactContext } from "react";

import { Keymap } from "../utils/types";

export type contextType = {
  shortcuts: Keymap;
  globalFunctions: globalFunctionsType;
};

export type globalFunctionsType = {
  [key: string]: {
    name: string;
    handler: Function;
    stopPropagation: boolean;
    preventDefault: boolean;
    alwaysFire: boolean;
  };
};

const Context: ReactContext<contextType> = createContext(null);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

export default Context;
