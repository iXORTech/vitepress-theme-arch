import { load } from "cheerio";

/**
 * 从文件名生成数字 ID
 * @param {string} fileName - 文件名
 * @returns {number} - 生成的数字ID
 */
export const generateId = (fileName) => {
  // 将文件名转换为哈希值
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
  }
  // 将哈希值转换为正整数
  const numericId = Math.abs(hash % 10000000000);
  return numericId;
};

/**
 * 动态加载脚本
 * @param {string} src - 脚本 URL
 * * @param {object} option - 配置
 */
export const loadScript = (src, option = {}) => {
  if (typeof document === "undefined" || !src) return false;
  // 获取配置
  const { async = false, reload = false, callback } = option;
  // 检查是否已经加载过此脚本
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    console.log("已有重复脚本");
    if (!reload) {
      callback && callback(null, existingScript);
      return false;
    }
    existingScript.remove();
  }
  // 创建一个新的script标签并加载
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    if (async) script.async = true;
    script.onload = () => {
      resolve(script);
      callback && callback(null, script);
    };
    script.onerror = (error) => {
      reject(error);
      callback && callback(error);
    };
    document.head.appendChild(script);
  });
};

/**
 * 动态加载样式表
 * @param {string} href - 样式表 URL
 * @param {object} option - 配置
 */
export const loadCSS = (href, option = {}) => {
  if (typeof document === "undefined" || !href) return false;
  // 获取配置
  const { reload = false, callback } = option;
  // 检查是否已经加载过此样式表
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) {
    console.log("已有重复样式");
    if (!reload) {
      callback && callback(null, existingLink);
      return false;
    }
    existingLink.remove();
  }
  // 创建新的link标签并设置属性
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.onload = () => {
      resolve(link);
      callback && callback(null, link);
    };
    link.onerror = (error) => {
      reject(error);
      callback && callback(error);
    };
    document.head.appendChild(link);
  });
};
