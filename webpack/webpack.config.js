const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const CssUrlRelativePlugin = require("css-url-relative-plugin");
const processNunjucksPages = require("./processNjkHelper.js");

const IS_DEV = process.env.NODE_ENV === "dev";

const config = {
  mode: IS_DEV ? "development" : "production",
  devtool: IS_DEV ? "eval" : "source-map",
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss|.css$/,
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "public/img"
            }
          },
          // WARNING: We used 'file-loader' instead of 'url-loader' because of an error when running build task.
          // TODO: Research/Fix why the 'url-loader' isn't working.
          /* {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "[path][name].[ext]?[hash]",
              fallback: "file-loader"
            }
          } */
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: false } },
                  { convertPathData: false }
                ]
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },

      // When fixed 'url-loader' find out about this issue. Place a separate rule for managing .svg files ???
      // https://github.com/webpack-contrib/url-loader/issues/6#issuecomment-63182275
      /* {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      }, */
      {
        test: /\.(njk)$/i,
        use: [
          "html-loader",
          {
            loader: "nunjucks-webpack-loader",
            //loader: path.resolve(__dirname, "src/loaders/nunjucks.loader.js"),
            options: {
              alias: {
                layout: path.resolve(__dirname, "src/partials/layout"),
                demo: path.resolve(__dirname, "src/partials/demo"),
                docs: path.resolve(__dirname, "src/partials/docs"),
                sections: path.resolve(__dirname, "src/partials/sections"),

                alt1: path.resolve(__dirname, "src/partials/alt-1"),
                alt2: path.resolve(__dirname, "src/partials/alt-2"),
                alt3: path.resolve(__dirname, "src/partials/alt-3")
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/public",
        to: "public"
      }
    ]),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new PreloadWebpackPlugin({
      include: "initial"
    }),
    new CssUrlRelativePlugin()
  ].concat(processNunjucksPages({ IS_DEV })),
  devServer: {
    contentBase: path.join(__dirname, "src")
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    },
    minimizer: []
  }
};

if (!IS_DEV) {
  const TerserPlugin = require("terser-webpack-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

  config.optimization.minimizer.push(
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = config;
