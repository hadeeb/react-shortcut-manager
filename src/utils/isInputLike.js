/**
 * Check if the node is an input element
 * @param {EventTarget} node
 * @returns {Boolean}
 */
export default function isInputLike(node) {
  return (
    node.tagName === "INPUT" ||
    node.tagName === "SELECT" ||
    node.tagName === "TEXTAREA"
  );
}
