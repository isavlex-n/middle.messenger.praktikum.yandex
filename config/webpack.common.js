const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const paths = require('./paths')

module.exports = {
  entry: `${paths.src}/index.ts`,
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: `${paths.static}/index.html`,
      favicon: `${paths.static}/icons/messenger.png`,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      '@': paths.src,
    },
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /(node_modules)/,
      },
      // Images
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
}
