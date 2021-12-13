const commonConfig = require("./webpack.common");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const { merge } = require("webpack-merge");

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return merge(commonConfig, devConfig);
    case "production":
      return merge(commonConfig, prodConfig);
    default:
      return merge(commonConfig, devConfig);
  }
};
