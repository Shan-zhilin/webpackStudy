import { logs } from "./utils";
// 引入 SCSS 文件，webpack 会自动处理
import "./styles/main.scss";

logs();

// 添加一些 DOM 操作来展示样式
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>Webpack SCSS Demo</h1>
      </div>
      <div class="content">
        <p>这是一个演示 SCSS 通过 webpack 转换为 CSS 的示例。</p>
        <p>SCSS 文件会被 sass-loader 编译成 CSS，然后通过 css-loader 解析，最后通过 style-loader 注入到页面中。</p>
        <button class="button">主要按钮</button>
        <button class="button-secondary">次要按钮</button>
        <div class="card">
          <h3>卡片标题</h3>
          <p>这是一个使用 SCSS 变量和嵌套的卡片组件。</p>
        </div>
      </div>
    </div>
  `;
});