const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const path = require("path");

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  entry: './index.ts',
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve("tsconfig.json"),
    },
    async: true,
  })],
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};