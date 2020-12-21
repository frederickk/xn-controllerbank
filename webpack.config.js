const path = require('path');
const {request} = require('http');
const webpack = require('webpack');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dataNoCoast = require('./data/no-coast.json');
const dataEyesy = require('./data/eyesy.json');

module.exports = {
  mode: (process.env.NODE_ENV === 'production')
    ? 'production'
    : 'development',

  entry: {
    index: [
      path.join(__dirname, './src/index'),
      path.join(__dirname, './src/index.scss'),
    ],
  },

  devServer: {
    contentBase: './dist',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [{
        test: /\.(ts|tsx)?$/i,
        use: 'ts-loader',
        exclude: [/node_modules/],
      }, {
        test: /\.html$/,
        use: 'html-loader'
      }, {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }, {
        test: /\.(json)$/i,
        type: 'asset/resource',
      }, {
        test: /\.(png|jpg|jpe?g|gif)$/i,
        type: 'asset/resource',
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
    ]
  },

  plugins: [
    new NunjucksWebpackPlugin({
      // TODO(frederickk): Determine how to pass request object to templates.
      templates: [{
        from: './src/index.njk',
        to: './index.html',
        context: {
          request: {
            url: '',
          }
        },
      }, {
        from: './src/index-data.njk',
        to: './no-coast/index.html',
        context: {
          data: dataNoCoast,
          request: {
            url: 'no-coast',
          }
        },
      }, {
        from: './src/index-data.njk',
        to: './eyesy/index.html',
        context: {
          data: dataEyesy,
          request: {
            url: 'eyesy',
          }
        },
      }],
      configure: {
        watch: true,
      },
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './src/images'),
        to: 'images',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
      }, {
        from: path.posix.join(
          path.resolve(__dirname, './src').replace(/\\/g, '/'), '*.json'
        ),
        to: '[name].[ext]',
        noErrorOnMissing: true,
      }],
    }),
  ],

  output: {
    publicPath: 'dist/',
    assetModuleFilename: 'images/[name][ext]',
  },
};