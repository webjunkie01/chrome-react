const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

require("babel-core/register");
require("babel-polyfill");

const PAGES_PATH = './src/pages'

const env = dotenv.parsed

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

function generateHtmlPlugins(items) {
  return items.map( (name) => new HtmlPlugin(
    {
      filename: `./${name}.html`,
      chunks: [ name ],
      title: "Top Tokens"
    }
  ))
}

module.exports = {
  entry: {
    background: [
      'babel-polyfill',
      `${PAGES_PATH}/background`,
    ],
    popup: [
      'babel-polyfill',
      `${PAGES_PATH}/popup`,
    ]
  },
  output: {
    path: path.resolve('build/html'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new ExtractTextPlugin(
      {
        filename: '[name].[contenthash].css',
      }
    ),
    new CopyPlugin(
      [
        {
          from: 'src',
          to: path.resolve('build'),
          ignore: [ 'pages/**/*', 'reducers/**/*','constants/**/*','sagas/**/*' ]
        }
      ]
    ),
    ...generateHtmlPlugins(
      [
        'background',
        'popup'
      ]
    )
  ]
}