let path = require('path')
let nodeExternals = require('webpack-node-externals')
let HtmlWebPackPlugin = require('html-webpack-plugin')
const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"],
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
    })
  ]
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

const rules = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'dev.henk' ,
    port: 9000,
    hot: true
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        include: [
          path.resolve(__dirname, 'dist')
        ],
        enforce: "pre"
      }
    ]
  }
}

module.exports = [client, server, rules];