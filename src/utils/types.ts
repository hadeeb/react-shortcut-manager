export type Action = string | string[];

export type ActionGroup = {
  windows?: Action;
  osx?: Action;
  linux?: Action;
  other?: Action;
};

export type Keymap = {
  [namespace: string]: {
    [action: string]: ActionGroup | Action;
  };
};
