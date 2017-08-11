var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.base.config.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  //devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('./../../Content/Web/Admin/TOWCodeMapping/'),
    //path: helpers.root('dist'),
    publicPath: '/vRiskwebsite/Content/Web/Admin/TOWCodeMapping/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
    // filename: '[name].[hash].js',
    // chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(ENV)
    //   }
    // }),
      new HtmlWebpackPlugin({
      title: "vRisk",
      //filename: 'index.html',
      filename: './../../../../views/Admin/TOWCodeMapping/index.cshtml',
      favicon: 'src/favicon.ico',
      template: 'src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});

