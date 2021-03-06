let path = require('path')
let nodeExternals = require('webpack-node-externals')
let HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"],
    },
    {
      test: /\.js$/,
      use: ["source-map-loader"],
      include: [
        path.resolve(__dirname, 'dist')
      ],
      enforce: "pre"
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use: ['css-loader']
        })
    }
  ]
}
const client = {
  mode: "development",
  entry: {
    client: './src/client/index.js'
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public')
  },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/index.html'
    }),
    new ExtractTextPlugin({
      filename: './src/client/style.css'
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
};
const server = {
  mode: "development",
  entry: {
    server: './src/server/index.js'
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: moduleObj,
  externals: [nodeExternals()]
};

module.exports = [client, server];