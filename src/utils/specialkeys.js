module.exports = {
  8: "backspace",
  9: "tab",
  13: "enter",
  16: "shift",
  17: "ctrl",
  18: "alt",
  20: "capslock",
  27: "esc",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "ins",
  46: "del",
  91: "meta",
  93: "meta",
  173: "minus",
  187: "plus",
  189: "minus",
  224: "meta"
};

/**
 * loop through the f keys, f1 to f19 and add them to the map
 * programatically
 */
for (var i = 1; i < 20; ++i) {
  module.exports[111 + i] = "f" + i;
}

/**
 * loop through to map numbers on the numeric keypad
 */
for (i = 0; i <= 9; ++i) {
  module.exports[i + 96] = `${i}`;
}
