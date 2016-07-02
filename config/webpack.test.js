const helpers = require('./helpers');
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
      alias: {
          materializecss: 'materialize-css/dist/css/materialize.css',
          materialize: 'materialize-css/dist/js/materialize.js',
      },
    extensions: ['', '.ts', '.js']
  },

  module: {
     preloaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        loader: 'null'
      }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]

  }
}
