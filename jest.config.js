module.exports = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleDirectories: ["node_modules", "src"]
};
