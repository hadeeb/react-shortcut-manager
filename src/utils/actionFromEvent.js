/**
 * Get matching action from a set of actions, given a keyboard event
 * @param {Object} actions
 * @param {KeyboardEvent} event
 * @returns {String|null} The action if it exists or null
 */
export default function getActionFromEvent(actions, event) {
  if (typeof actions !== "object") return null;
  for (let key in actions) {
    if (areEventsEqual(actions[key], event)) return key;
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
  if (event.altKey && !keys.includes("ALT")) return false;
  if (event.ctrlKey && !keys.includes("CTRL")) return false;
  return keys.every(key => {
    switch (key) {
      case "SHIFT":
        return event.shiftKey;
      case "ALT":
        return event.altKey;
      case "CTRL":
        return event.ctrlKey;
      default:
        return key.charCodeAt() === event.keyCode;
    }
  });
}
