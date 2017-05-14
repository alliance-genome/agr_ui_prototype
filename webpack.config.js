var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // context: dirname,
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // And then the actual application
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: 'main.js'
  },
  devtool: '#source-map',
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("agr.css"),
  ],
  // preLoaders: [
  //   {
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     loader: 'eslint'
  //   }
  // ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          ]
        }),
      },
      // {
      //   test: /\.css$/,
      //   exclude: /src/,
      //   loaders: ['style', 'css']
      // },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  }
}

// import path from 'path';
// import webpack from 'webpack';

// import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import ManifestRevisionPlugin from 'manifest-revision-webpack-plugin';

// let isProduction = process.env.NODE_ENV === 'production';
// let API_URL = process.env.API_URL || 'http://localhost:5000';
// let DEV_SERVER_UI_PORT = process.env.DEV_SERVER_UI_PORT || '2992';

// // Development asset host, asset location and build output path.
// const rootAssetPath = './assets';
// const buildOutputPath = 'dist';

// let config = {
//   context: path.join(__dirname, 'src'),
//   debug: true,
//   entry: [
//     './index.js'
//   ],
//   output: {
//     path: buildOutputPath,
//     publicPath: '/assets/',
//     filename: '[name].js',
//     chunkFilename: '[id].js'
//   },
//   devtool: 'eval-source-map',
//   devServer: {
//     contentBase: 'dist',
//     historyApiFallback: true,
//     port: DEV_SERVER_UI_PORT,
//     proxy: {
//       '/api': {
//         target: API_URL,
//         secure: false
//       }
//     }
//   },
//   module: {
//     preLoaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'eslint'
//       }
//     ],
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel'
//       },
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         loaders: ['style', 'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss']
//       },
//       {
//         test: /\.css$/,
//         exclude: /src/,
//         loaders: ['style', 'css']
//       },
//       {
//         test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
//         exclude: /node_modules/,
//         loader: 'url?limit=100000'
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin('[name].[chunkhash].css'),
//     new ManifestRevisionPlugin(path.join('dist', 'manifest.json'), {
//         rootAssetPath: rootAssetPath,
//         ignorePaths: ['/styles', '/scripts']
//     })
//   ]
// };

// if (isProduction) {
//   config.devtool = 'source-map';
//   config.devServer = {};
//   config.plugins = [
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     }),
//     new ExtractTextPlugin('[name].[chunkhash].css'),
//     new ManifestRevisionPlugin(path.join('dist', 'manifest.json'), {
//       rootAssetPath: rootAssetPath,
//       ignorePaths: ['/styles', '/scripts']
//     })
//   ]
// }

// export default config;
