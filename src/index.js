/**
 * Webpack Demo 入口文件
 * 演示：
 * 1. CommonJS/ESM 模块混用
 * 2. Babel 转换 ES6+ 到 ES5
 * 3. 图片资源加载 (file-loader/url-loader)
 * 4. DevServer 热更新
 */

// 引入样式
import './styles/main.scss';

// ========================
// 1. CommonJS/ESM 混用示例
// ========================

// 导入 CommonJS 模块 (使用 require)
const mathUtils = require("./modules/mathUtils");

// 导入 ESM 模块 (使用 import)
import { capitalize, reverse, truncate } from './modules/stringUtils';
import { sum, double, squareAll, filterAndTransform } from './modules/arrayUtils';
import { APP_CONFIG, getAppInfo } from './modules/config';

// ========================
// 2. 导入图片资源
// ========================
import placeholderImg from './assets/placeholder.svg';
import smallIcon from './assets/small-icon.svg';

// ========================
// 日志收集器 - 用于在页面上展示 console 输出
// ========================
const logs = [];
const originalLog = console.log;
console.log = (...args) => {
  originalLog.apply(console, args);
  logs.push({
    type: 'info',
    message: args.join(' '),
    time: new Date().toLocaleTimeString()
  });
  updateConsoleOutput();
};

// 更新页面上的 console 输出
const updateConsoleOutput = () => {
  const consoleEl = document.querySelector('.console-output');
  if (consoleEl) {
    consoleEl.innerHTML = logs.map(log => 
      `<div class="log-line ${log.type}">[${log.time}] ${log.message}</div>`
    ).join('');
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }
};

// ========================
// 3. 演示各个模块的功能
// ========================
const runDemo = () => {
  console.log('🚀 Demo 开始运行...');
  console.log('---');
  
  // 测试 mathUtils (CommonJS)
  console.log('📦 测试 mathUtils (CommonJS):');
  console.log(`  add(5, 3) = ${mathUtils.add(5, 3)}`);
  console.log(`  multiply(4, 6) = ${mathUtils.multiply(4, 6)}`);
  console.log(`  square(7) = ${mathUtils.square(7)}`);
  console.log('---');
  
  // 测试 stringUtils (ESM)
  console.log('📦 测试 stringUtils (ESM):');
  console.log(`  capitalize("hello") = ${capitalize("hello")}`);
  console.log(`  reverse("webpack") = ${reverse("webpack")}`);
  console.log(`  truncate("webpack is awesome", 10) = ${truncate("webpack is awesome", 10)}`);
  console.log('---');
  
  // 测试 arrayUtils (ESM，内部调用 CommonJS)
  console.log('📦 测试 arrayUtils (ESM，混用 CommonJS):');
  const testArray = [1, 2, 3, 4, 5];
  console.log(`  sum([1,2,3,4,5]) = ${sum(testArray)}`);
  console.log(`  double([1,2,3,4,5]) = [${double(testArray)}]`);
  console.log(`  squareAll([1,2,3,4,5]) = [${squareAll(testArray)}]`);
  console.log('---');
  
  // 测试 config (ESM)
  console.log('📦 测试 config (ESM):');
  const appInfo = getAppInfo();
  console.log(`  应用名: ${appInfo.name}`);
  console.log(`  版本: ${appInfo.version}`);
  console.log('---');
  
  console.log('✅ Demo 运行完成！');
};

// ========================
// 4. 渲染页面
// ========================
const render = () => {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="container">
      <!-- 头部区域 - 展示背景图 -->
      <div class="header">
        <h1>${APP_CONFIG.name}</h1>
        <p>${APP_CONFIG.description}</p>
      </div>
      
      <!-- 模块依赖图展示 -->
      <div class="demo-section">
        <h2>模块依赖图 (CommonJS/ESM 混用)</h2>
        <div class="module-list">
          <div class="module-item commonjs">
            <div class="module-name">mathUtils.js</div>
            <div class="module-type">CommonJS</div>
          </div>
          <div class="module-item esm">
            <div class="module-name">stringUtils.js</div>
            <div class="module-type">ES Module</div>
          </div>
          <div class="module-item esm">
            <div class="module-name">arrayUtils.js</div>
            <div class="module-type">ESM (引用 CJS)</div>
          </div>
          <div class="module-item esm">
            <div class="module-name">config.js</div>
            <div class="module-type">ESM (引用 ESM)</div>
          </div>
        </div>
        <div class="dependency-graph">
          <pre>
index.js (入口) - ESM 可导入 CommonJS
├── mathUtils.js (CommonJS)
│   └── exports: add, multiply, square
├── stringUtils.js (ESM)
│   └── exports: capitalize, reverse, truncate
├── arrayUtils.js (ESM)
│   └── imports: mathUtils.js (CommonJS) ← ESM 导入 CJS
│   └── exports: sum, double, squareAll
└── config.js (ESM)
    └── imports: stringUtils.js (ESM)
    └── exports: APP_CONFIG, getAppInfo
          </pre>
        </div>
      </div>
      
      <!-- 图片加载展示 -->
      <div class="demo-section">
        <h2>图片资源加载 (file-loader/url-loader)</h2>
        <p>Webpack 5 使用内置的 asset module 处理图片资源。小于 8KB 的图片会被转为 base64 内联。</p>
        <div class="image-demo">
          <div class="image-box">
            <img src="${placeholderImg}" alt="Placeholder">
            <p>placeholder.svg<br><small>file-loader 效果</small></p>
          </div>
          <div class="image-box">
            <img src="${smallIcon}" alt="Small Icon" style="width: 64px;">
            <p>small-icon.svg<br><small>小图标</small></p>
          </div>
        </div>
        <h3>publicPath 说明</h3>
        <p>当前 publicPath: <code>/</code> - 所有资源从根路径加载</p>
        <p>图片路径: <code>${placeholderImg}</code></p>
      </div>
      
      <!-- Babel 转换展示 -->
      <div class="demo-section">
        <h2>Babel 转换 (ES6+ → ES5)</h2>
        <p>代码中使用的 ES6+ 特性会被 Babel 转换为 ES5，兼容 IE11：</p>
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li>箭头函数 <code>() => {}</code> → <code>function() {}</code></li>
          <li>const/let → var</li>
          <li>模板字符串 → 字符串拼接</li>
          <li>展开运算符 <code>...arr</code> → <code>Array.prototype.slice</code></li>
          <li>解构赋值 → 传统赋值</li>
        </ul>
        <p><small>💡 运行 <code>npm run build</code> 后查看 dist 目录中的代码验证转换结果</small></p>
      </div>
      
      <!-- 控制台输出 -->
      <div class="demo-section">
        <h2>模块调用演示</h2>
        <button class="button button-primary" onclick="window.runDemo()">运行 Demo</button>
        <button class="button button-secondary" onclick="window.clearLogs()">清空日志</button>
        <div class="console-output">
          <div class="log-line">点击上方按钮运行 Demo...</div>
        </div>
      </div>
      
      <!-- HMR 展示 -->
      <div class="demo-section">
        <h2>DevServer 热更新 (HMR)</h2>
        <p>当前运行模式: <strong>${process.env.NODE_ENV || 'development'}</strong></p>
        <p>修改代码后，浏览器会自动更新，无需手动刷新页面。</p>
        <p><small>💡 尝试修改 <code>src/styles/main.scss</code> 中的颜色变量，观察页面实时更新</small></p>
      </div>
    </div>
    
    <!-- HMR 指示器 -->
    <div class="hmr-indicator">
      <span class="dot"></span>
      HMR 已启用
    </div>
  `;
  
  // 初始化 console 输出区域
  updateConsoleOutput();
};

// 暴露全局函数
window.runDemo = runDemo;
window.clearLogs = () => {
  logs.length = 0;
  const consoleEl = document.querySelector('.console-output');
  if (consoleEl) {
    consoleEl.innerHTML = '<div class="log-line">日志已清空...</div>';
  }
};

// ========================
// 5. 页面初始化
// ========================
document.addEventListener('DOMContentLoaded', () => {
  render();
  console.log('📋 页面加载完成');
  console.log(`📱 应用: ${APP_CONFIG.name} v${APP_CONFIG.version}`);
});

// ========================
// 6. HMR 热模块替换
// ========================
if (module.hot) {
  module.hot.accept('./styles/main.scss', () => {
    console.log('🔥 样式已热更新');
  });
  
  module.hot.accept('./modules/mathUtils', () => {
    console.log('🔥 mathUtils 模块已热更新');
  });
  
  module.hot.accept('./modules/stringUtils', () => {
    console.log('🔥 stringUtils 模块已热更新');
  });
  
  module.hot.accept('./modules/arrayUtils', () => {
    console.log('🔥 arrayUtils 模块已热更新');
  });
  
  module.hot.accept('./modules/config', () => {
    console.log('🔥 config 模块已热更新');
  });
}
