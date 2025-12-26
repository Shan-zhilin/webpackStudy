/**
 * 字符串工具模块 - 使用 ESM 导出
 * 演示 ES Module 模块规范
 */

// ESM 导出方式 - 命名导出
export const capitalize = (str) => {
  console.log('[stringUtils - ESM] 执行首字母大写');
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const reverse = (str) => {
  console.log('[stringUtils - ESM] 执行字符串反转');
  return str.split('').reverse().join('');
};

export const truncate = (str, maxLength = 10) => {
  console.log('[stringUtils - ESM] 执行字符串截断');
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

// ESM 默认导出
export default {
  capitalize,
  reverse,
  truncate
};

