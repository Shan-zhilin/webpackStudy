/**
 * 数组工具模块 - 使用 ESM
 * 同时引入 CommonJS 模块 (mathUtils)，演示 ESM 导入 CommonJS
 */

// ESM 导入 CommonJS 模块 - webpack 会自动处理兼容
// CommonJS 的 module.exports 会被当作 default export
import mathUtils from './mathUtils';

// 使用箭头函数 - 后续会被 babel 转换为 ES5
export const sum = (arr) => {
  console.log('[arrayUtils - ESM] 执行数组求和，内部调用 mathUtils.add');
  return arr.reduce((acc, curr) => mathUtils.add(acc, curr), 0);
};

export const double = (arr) => {
  console.log('[arrayUtils - ESM] 执行数组元素翻倍，内部调用 mathUtils.multiply');
  return arr.map((item) => mathUtils.multiply(item, 2));
};

export const squareAll = (arr) => {
  console.log('[arrayUtils - ESM] 执行数组元素平方，内部调用 mathUtils.square');
  return arr.map((item) => mathUtils.square(item));
};

// 使用更多 ES6+ 特性，验证 babel 转换
export const filterAndTransform = (arr, predicate, transformer) => {
  // 使用展开运算符和箭头函数
  const filtered = [...arr].filter(predicate);
  return filtered.map(transformer);
};

export default {
  sum,
  double,
  squareAll,
  filterAndTransform
};

