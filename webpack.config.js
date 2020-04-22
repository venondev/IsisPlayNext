const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background.js",
    content: "./src/content.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{
        from: "./src/manifest.json",
        to: "./manifest.json",
      },
      {
        from: "./src/content.css",
        to: "./content.css",
      },
    ]),
  ],
};