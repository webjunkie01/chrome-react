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
    // background: [
    //   'babel-polyfill',
    //   `${PAGES_PATH}/background`,
    // ],
    background: [
      'babel-polyfill',
      `${PAGES_PATH}/background.ts`,
    ],
    // popup: [
    //   'babel-polyfill',
    //   `${PAGES_PATH}/popup`,
    // ]
    popup: [
      'babel-polyfill',
      `${PAGES_PATH}/popup.tsx`,
    ]
  },
  devtool: "source-map",
  output: {
    path: path.resolve('build/html'),
    filename: '[name].js'
  },
  resolve: {
         // Add '.ts' and '.tsx' as resolvable extensions.
         extensions: [".ts", ".tsx", ".js", ".json"]
     },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
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
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // },
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