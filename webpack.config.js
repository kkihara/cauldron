const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const externals = require('./app/package.json').dependencies;
  // externals: [ 'commonjs' ] + Object.keys(externals || {}),

module.exports = {

  watch: true,

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
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }

}
