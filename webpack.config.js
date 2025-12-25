const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 基本方式
  mode: "development", // 开发模式不压缩，便于调试
  // entry: "./src/index.js", // 单入口文件
  entry: {
    index: "./src/index.js",
    admin: "./src/admin.js",
  }, // 多入口
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    //  多页应用
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   chunks: ["index"], // 只放 app 入口的资源
    //   title: "应用首页",
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "admin.html",
    //   chunks: ["admin"],
    //   title: "管理后台",
    // }),

    // 动态模版
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   minify: {
    //     collapseWhitespace: true, // 去空白
    //     removeComments: true, // 删注释
    //     removeRedundantAttributes: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //   },
    // }),
    new HtmlWebpackPlugin(),
    // 提取 CSS 到单独文件
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css", // 输出的 CSS 文件名
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all", // 对所有 chunk 生效
      cacheGroups: {
        vendor: {
          // 把 node_modules 打成一个 vendor
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
        common: {
          // 两入口都引的自定义工具
          minChunks: 2,
          name: "common",
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 到单独文件（替代 style-loader）
          "css-loader",   // 解析 CSS 文件
          "sass-loader"   // 将 SCSS 编译成 CSS
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
