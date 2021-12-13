const path = require("path");
const nodeExternales = require("webpack-node-externals");

module.exports = {
  entry: path.join(__dirname, "src", "app.ts"),
  target: "node",
  externals: [nodeExternales()],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: [".js", ".ts"],
  },
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "dist"),
  },
};
