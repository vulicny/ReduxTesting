const path = require('path');
var webpack = require("webpack");

var config = {
   entry: './src/main.js',

   output: {
      filename: './dist/bundle.js',
   },

   devServer: {
      inline: true,
      port: 9091
   },

    devtool: "source-map",


   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         },
         {  test: /\.css$/, loader: "style-loader!css-loader" }
      ]
   },

   plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}

module.exports = config;
