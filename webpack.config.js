const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "../examples/index.html",
  filename: "index.html",
  inject: "body"
});
module.exports = {
  context: `${__dirname}/examples`,
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: `${__dirname}/examples/build`
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.t|jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, ".babelrc")))
          }
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
};
