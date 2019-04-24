const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js',
  mode: 'none',
  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: __dirname,
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
        ],
      },
    ]
  }
};