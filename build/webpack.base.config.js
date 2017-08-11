var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'angular': './src/angular.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
        test: /\.ts$/,
        loaders: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('src', 'tsconfig.json')
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      //   use: 'file-loader?name=assets/images/[name].[ext]'
      // },
       {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[name].[ext]'
        }
      },
       {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[ext]'
        }
      },

      {
        test: /\.json$/,
        use: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: false
            }
          }]
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: ['to-string-loader', {
          loader: 'css-loader',
          options: {
            includePaths: [path.resolve("./src/app")]
          }
        }]
      }
      //  {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'),
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   })
      // },
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //           use: ['to-string-loader', {
      //     loader: 'css-loader',
      //     options: {
      //       includePaths: [path.resolve("./src/app")]
      //     }
      //   }]
      // }

    ],
    exprContextCritical: false
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'angular', 'polyfills']
    }),
  
    new ExtractTextPlugin("./assets/style/[name].css"),
    // new copyWebpackPlugin([{
    //   from:  "./node_modules/font-awesome/css/",
    //   toType:"file",
    //   to: "./assets/style/font-awesome.css",
    //   ignore:["^[^font-awesome.css]"]
    // },{
    //    from:  "./node_modules/primeng/resources/themes/omega/",
    //   toType:"file",
    //   to: "./assets/style/theme.css",
    //   ignore:["^[^theme.css]"]
    // },{
    //    from:  "./node_modules/primeng/resources/",
    //   toType:"file",
    //   to: "./assets/style/primeng.css",
    //   ignore:["^[^primeng.css]"]
    // }
    // // ,{
    // //    from:  "./src/",
    // //   toType:"file",
    // //   to: "./../../../../views/Admin/TOWCodeMapping/index2.cshtml",
    // //   ignore:["^[^index.html]"]
    // // }
    // ])
  ]
};
