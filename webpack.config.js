const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'bundle');
var APP_DIR = path.resolve(__dirname, 'client/app/js');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/client/app'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: '.',
    hot: true
  },
  externals: {
    'Config': JSON.stringify(process.env.ENV === 'production' ? {
      url: "use this url in production"
    } : {
      url: "use this url in development"
    })
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({asset: "[path].gz[query]",algorithm: "gzip",test: /\.js$|\.css$|\.html$/,threshold: 10240,minRatio: 0}),
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.ProvidePlugin({ $: 'jquery',jQuery: 'jquery','window.jQuery': 'jquery', 'React' : 'react', 'ReactDOM':'react-dom' , 'Config' : 'Config'}),
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/,exclude: /node_modules/,loader: 'babel-loader', query: {plugins: ['transform-runtime'],presets: ['env','react'],}},
      {test: /\.css$/,use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:10]"'}),},
      {test: /\.scss$/,loader: "style-loader!css-loader!sass-loader?sourceMap"},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
    ]
  },
  resolve: {
    modules: ['./','node_modules'],
    extensions: ['.js', '.jsx', '.json','.css','.scss','.ttf','.eot','.woff','.woff2'] 
  }
};

module.exports = config;