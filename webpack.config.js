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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            babelrc: false
          }
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
};
