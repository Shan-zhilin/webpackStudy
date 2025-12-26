/**
 * 配置模块 - 使用 ESM
 * 演示 ESM 导入其他模块
 */

// ESM 导入方式
import { capitalize } from './stringUtils';

// 应用配置
export const APP_CONFIG = {
  name: 'Webpack Study Demo',
  version: '1.0.0',
  author: 'Developer',
  description: 'CommonJS/ESM 混用 + Babel + 图片加载 + DevServer 热更新'
};

// 使用从 stringUtils 导入的函数
export const getFormattedName = () => {
  const name = APP_CONFIG.name;
  console.log('[config - ESM] 调用 stringUtils 格式化应用名');
  return capitalize(name.toLowerCase());
};

export const getAppInfo = () => {
  return {
    ...APP_CONFIG,
    formattedName: getFormattedName(),
    timestamp: new Date().toISOString()
  };
};

// ESM 默认导出
export default {
  APP_CONFIG,
  getFormattedName,
  getAppInfo
};
