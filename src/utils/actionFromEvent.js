import specialkeys from "./specialkeys";
/**
 * Get matching action from a set of actions, given a keyboard event
 * @param {Object} actions
 * @param {KeyboardEvent} event
 * @returns {String|null} The action if it exists or null
 */
export default function getActionFromEvent(actions, event) {
  if (typeof actions !== "object") return null;
  for (let key in actions) {
    if (Array.isArray(actions[key])) {
      for (let action of actions[key]) {
        if (areEventsEqual(action, event)) return key;
      }
    } else if (areEventsEqual(actions[key], event)) return key;
  }
  return null;
}

/**
 * Check if shortcut matches the keyboard event
 * @param {String} accelerator
 * @param {KeyboardEvent} event
 * @returns {Boolean}
 */
export function areEventsEqual(accelerator, event) {
  const keys = accelerator
    .toUpperCase()
    .split("+")
    .map(key => key.trim());

  if (event.shiftKey && !keys.includes("SHIFT")) return false;
  if (event.altKey && !(keys.includes("ALT") || keys.includes("OPTION")))
    return false;
  if (event.ctrlKey && !keys.includes("CTRL")) return false;
  if (
    event.metaKey &&
    !(
      keys.includes("META") ||
      keys.includes("CMD") ||
      keys.includes("COMMAND") ||
      keys.includes("SUPER") ||
      keys.includes("WIN")
    )
  )
    return false;
  return keys.every(key => {
    switch (key) {
      case "SHIFT":
        return event.shiftKey;
      case "CTRL":
        return event.ctrlKey;
      case "ALT":
      case "OPTION":
        return event.altKey;
      case "META":
      case "CMD":
      case "COMMAND":
      case "SUPER":
      case "WIN":
        return event.metaKey;
      default:
        if (key.length === 1 && key >= "A" && key <= "Z")
          return key.charCodeAt() === event.keyCode;
        return (
          specialkeys[event.keyCode] &&
          specialkeys[event.keyCode].toUpperCase() === key
        );
    }
  });
}
