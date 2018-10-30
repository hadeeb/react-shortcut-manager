/**
 * Returns the string with an almost unique id appended to it
 * @param {String} name
 * @returns {String} String + _ + unique id
 */
export default function ID(name = "") {
  if (typeof name === "object")
    throw "The parameter should be of primitive data type";
  return (
    name +
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 5)
  );
}
