import { Action, ActionGroup, Keymap } from "./types";

/**
 *
 * @param {Object} keymap
 * @returns {Object} Keymap for current platform
 */
export default function getShortcutsofPlatform(keymap: Keymap): Keymap {
  const platformName = getPlatformName();

  return transformShortcuts(platformName, keymap);
}

function transformShortcuts(platformName: string, keymap: Keymap): Keymap {
  const transformedKeymap = {};
  for (let name of Object.keys(keymap)) {
    const transformedKeygroup = {};
    const keygroup = keymap[name];

    for (let shortcutname of Object.keys(keygroup)) {
      let transformedKeys: Action = void 0;
      const key = keygroup[shortcutname];

      if (key) {
        if (!Array.isArray(key) && typeof key === "object") {
          transformedKeys = getShortcut(key, platformName);
        } else transformedKeys = key;
      }

      if (transformedKeys !== void 0)
        transformedKeygroup[shortcutname] = transformedKeys;
    }
    if (Object.keys(transformedKeygroup).length > 0)
      transformedKeymap[name] = transformedKeygroup;
  }

  return transformedKeymap;
}

function getShortcut(object: ActionGroup, platform: string) {
  if (object[platform]) return object[platform];
  else if (object.other) return object.other;
  else return "";
}

function getPlatformName(): string {
  let ua = navigator.userAgent;
  let os = "other";
  if (ua.indexOf("Win") !== -1) os = "windows";
  if (ua.indexOf("Mac") !== -1) os = "osx";
  if (ua.indexOf("Linux") !== -1) os = "linux";
  return os;
}
