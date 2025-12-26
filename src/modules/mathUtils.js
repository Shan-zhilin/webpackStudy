/**
 * 数学工具模块 - 使用 CommonJS 导出
 * 演示 CommonJS 模块规范
 */

// CommonJS 导出方式
const add = (a, b) => {
  console.log('[mathUtils - CommonJS] 执行加法');
  return a + b;
};

const multiply = (a, b) => {
  console.log('[mathUtils - CommonJS] 执行乘法');
  return a * b;
};

const square = (n) => {
  console.log('[mathUtils - CommonJS] 执行平方');
  return n * n;
};

// CommonJS 导出
module.exports = {
  add,
  multiply,
  square
};

