const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './source/index.tsx',
  output: {filename: 'bundle.js', path: path.join(__dirname, 'build')},
  devServer: {contentBase: path.join(__dirname, 'build'), port: 4444, open: true},
  resolve: {extensions: ['.js', '.ts', '.tsx']},
  plugins: [new HtmlWebpackPlugin({template: 'source/index.html', inject: false})],
  module: {rules: [{test: /\.(ts|tsx)$/, exclude: /node_modules/, loader: 'ts-loader'}]},
};
