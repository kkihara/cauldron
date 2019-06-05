const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  target: 'electron-renderer',

  entry: './app/src/renderer_process.js',

  output: {
    path: __dirname + '/app/build',
    publicPath: 'build/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    'sqlite3': 'commonjs sqlite3'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['react', 'babel-preset-env'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
          modules: true,
          url: false
          }
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new CopyPlugin([
      { from: __dirname + '/assets/icon.png', to: __dirname  },
    ]),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }

}
