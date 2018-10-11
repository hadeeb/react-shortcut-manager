/**
 * Returns the string an almost unique id appended to it
 * @param {String} name
 * @returns {String} String + _ + unique id
 */
export default function ID(name) {
  return (
    name +
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 5)
  );
}
