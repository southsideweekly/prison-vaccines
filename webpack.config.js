const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { baseurl } = require("./site/_data/site")

const config = {
  target: "web",
  devtool: "source-map",
  mode: "production",
  entry: {
    app: [path.resolve("./src/js/legacy.js")],
  },
  output: {
    path: path.resolve("./dist/static"),
    filename:
      process.env.NODE_ENV === "production"
        ? "[name].[chunkhash].js"
        : "[name].js",
    publicPath: `${baseurl}/static/`,
  },
  optimization:
    process.env.NODE_ENV === "production"
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({ cache: true, parallel: true, sourceMap: true }),
          ],
        }
      : {},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!smoothscroll-anchor-polyfill).*/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true,
                    targets: [">1%", "ie 11", "not op_mini all"],
                    useBuiltIns: "usage",
                    corejs: 3,
                    modules: false,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./site/_includes/webpack.html"),
      filename: path.resolve("./site/_includes/webpack.njk"),
      inject: false,
    }),
  ],
  resolve: {
    extensions: [".js"],
  },
  watchOptions: {
    poll: true,
  },
}

module.exports = config
