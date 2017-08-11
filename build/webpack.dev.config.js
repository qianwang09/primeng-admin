var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.base.config.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  
  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  plugins: [
     new HtmlWebpackPlugin({
      title: "vRisk",
      filename: 'index.html',
      //filename: './../../../../views/Admin/TOWCodeMapping/index.cshtml',
      favicon: 'src/favicon.ico',
      template: 'src/index.html'
    }),
  ],
  
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist',
    stats: 'minimal'
  }
});
