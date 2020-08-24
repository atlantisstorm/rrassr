const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const mode = "development";

const browserConfig = {
  mode,
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })  
  ]
};

const serverConfig = {
  mode,
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'  
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader'}  
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })  
  ]
};

module.exports = [browserConfig, serverConfig];