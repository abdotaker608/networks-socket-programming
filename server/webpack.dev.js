const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  plugins: [new NodemonPlugin()],
};
