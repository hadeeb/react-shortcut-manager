/**
 * Check if the node is an input element
 * @param {HTMLElement} node
 * @returns {boolean}
 */
export default function isInputLike(node: HTMLElement): boolean {
  return (
    node.tagName === "INPUT" ||
    node.tagName === "SELECT" ||
    node.tagName === "TEXTAREA"
  );
}
