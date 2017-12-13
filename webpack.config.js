const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const templatePath = path.resolve(__dirname, './public/index.html')
const inputPath = './index.tsx'
const componentInputPath = './index.tsx'
const outputPath = path.resolve(__dirname, './dist')
const port = 8714

module.exports = {
  entry: {
    'page-preview': componentInputPath,
    'index': inputPath,
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    contentBase: ['public', 'dist'],
    compress: true,
    port,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    library: 'page-preview',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin([
      outputPath
    ]),
    new HtmlWebpackPlugin({
      template: templatePath
    }),
    new CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    })
  ]
};