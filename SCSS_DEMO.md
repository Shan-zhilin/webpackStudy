# Webpack SCSS 转 CSS Demo

这个 demo 演示了如何通过 webpack 将 SCSS 文件转换为 CSS。

## 配置说明

### 1. 安装依赖

需要安装以下依赖包：

```json
{
  "sass": "^1.80.0",           // Sass 编译器
  "sass-loader": "^16.0.2",    // webpack 的 SCSS 加载器
  "css-loader": "^7.1.2",      // 解析 CSS 文件
  "style-loader": "^4.0.0"     // 将 CSS 注入到 DOM
}
```

### 2. Webpack 配置

在 `webpack.config.js` 中配置 module.rules：

```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        "style-loader", // 将 CSS 注入到 DOM 中
        "css-loader",   // 解析 CSS 文件
        "sass-loader"   // 将 SCSS 编译成 CSS
      ],
    },
  ],
}
```

**加载顺序很重要**（从右到左执行）：
1. `sass-loader`: 将 SCSS 编译成 CSS
2. `css-loader`: 解析 CSS 中的 `@import` 和 `url()`
3. `style-loader`: 将 CSS 注入到页面的 `<style>` 标签中

### 3. 在 JavaScript 中引入 SCSS

```javascript
// 在入口文件中引入 SCSS
import "./styles/main.scss";
```

## SCSS 特性演示

### 变量 (Variables)
```scss
$primary-color: #3498db;
$font-size-base: 16px;
```

### 嵌套 (Nesting)
```scss
.container {
  .header {
    background-color: $primary-color;
  }
}
```

### Mixin
```scss
@mixin button-style($bg-color) {
  background-color: $bg-color;
  padding: 10px 20px;
}
```

### 函数
```scss
.button {
  @include button-style($primary-color);
}
```

## 运行

1. 安装依赖：
```bash
npm install
```

2. 构建项目：
```bash
npx webpack
```

3. 打开 `dist/index.html` 查看效果

## 处理流程

```
SCSS 文件 
  ↓
sass-loader (编译 SCSS → CSS)
  ↓
css-loader (解析 CSS)
  ↓
style-loader (注入到 DOM)
  ↓
页面中显示样式
```

