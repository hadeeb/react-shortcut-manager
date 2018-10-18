import { createContext } from "react";

const Context = createContext(null);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

export default Context;
