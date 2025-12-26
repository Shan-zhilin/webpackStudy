const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 判断是否是开发环境
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  // ========================
  // 1. 基本配置
  // ========================
  mode: isDev ? "development" : "production",

  // 单入口 - 用于本次 demo
  entry: "./src/index.js",

  output: {
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // ========================
    // 3. publicPath 配置
    // 这是资源的公共路径前缀，影响 HTML 中引用资源的路径
    // 开发环境用 /，生产环境可以改成 CDN 地址如 https://cdn.example.com/
    // ========================
    publicPath: "/",
  },

  // ========================
  // 4. DevServer 配置 - 实现热更新
  // ========================
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,                    // 端口号
    open: true,                    // 自动打开浏览器
    hot: true,                     // 启用 HMR 热模块替换
    compress: true,                // 启用 gzip 压缩
    historyApiFallback: true,      // SPA 路由支持
    client: {
      overlay: {                   // 编译错误时显示遮罩层
        errors: true,
        warnings: false,
      },
      progress: true,              // 显示编译进度
    },
    // 可选：代理配置
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //   }
    // }
  },

  // ========================
  // Source Map 配置 - 便于调试
  // ========================
  devtool: isDev ? "eval-cheap-module-source-map" : "source-map",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Webpack Demo - CommonJS/ESM + Babel + 图片加载 + DevServer",
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash:8].css",
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
        common: {
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
      // ========================
      // 2. Babel Loader - 转换 ES6+ 到 ES5
      // 让 IE11 等老浏览器也能运行
      // ========================
      {
        test: /\.js$/,
        exclude: /node_modules/,    // 排除 node_modules
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,   // 启用缓存，提升构建速度
          },
        },
      },

      // ========================
      // 3. 图片资源处理
      // webpack 5 推荐使用内置的 asset module
      // 但为了学习目的，我们同时展示 file-loader 和 url-loader 的配置
      // ========================

      // 方式一：使用 webpack 5 内置 asset module（推荐）
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: "asset",              // 自动选择 inline 或 resource
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,      // 小于 8KB 转 base64 inline
          },
        },
        generator: {
          filename: "images/[name].[hash:8][ext]",  // 输出路径和文件名
        },
      },

      // SVG 文件处理
      {
        test: /\.svg$/i,
        type: "asset/resource",     // 总是输出为文件
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
      },

      // 方式二：使用 file-loader（webpack 4 方式，供参考）
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[hash:8].[ext]',
      //         outputPath: 'images/',
      //         publicPath: '/images/',  // 资源的公共路径
      //       },
      //     },
      //   ],
      // },

      // 方式三：使用 url-loader（webpack 4 方式，供参考）
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,           // 小于 8KB 转 base64
      //         fallback: 'file-loader',
      //         name: '[name].[hash:8].[ext]',
      //         outputPath: 'images/',
      //         publicPath: '/images/',
      //       },
      //     },
      //   ],
      // },

      // SCSS 处理
      {
        test: /\.scss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },

      // CSS 处理
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },

  // 解析配置
  resolve: {
    extensions: [".js", ".json"],   // 自动解析扩展名
    alias: {
      "@": path.resolve(__dirname, "src"),  // 路径别名
    },
  },
};
