/**
 * Babel 配置文件
 * 用于将 ES6+ 代码转换为 ES5，兼容 IE11
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 目标浏览器配置
        targets: {
          ie: '11',           // 兼容 IE11
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
        },
        // 按需引入 polyfill
        useBuiltIns: 'usage',
        corejs: 3,
        // 开启调试信息，查看转换了哪些内容
        debug: false
      }
    ]
  ],
  plugins: [
    // 可以在这里添加额外的 babel 插件
  ]
};

