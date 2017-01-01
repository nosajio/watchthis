const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../app/entry.jsx'),
  output: {
    publicPath: path.resolve(__dirname, '../dist'),
    path: path.resolve(__dirname, '../dist'),
    filename: 'watchthis.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('watchthis.css')
  ],
};
