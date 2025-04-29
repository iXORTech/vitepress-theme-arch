/**
 * Generate numeric ID based on file name.
 * @param {string} fileName - file name
 * @returns {number} - generated ID
 */
export const generateId = (fileName) => {
  // Convert file name to a hash value.
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
  }
  // Convert hash to a positive number.
  const numericId = Math.abs(hash % 10000000000);
  return numericId;
};

/**
 * Dynamically load script.
 * @param {string} src - URL of the script
 * @param {object} option - configuration options
 */
export const loadScript = (src, option = {}) => {
  if (typeof document === "undefined" || !src) return false;
  // Get configuration options.
  const { async = false, reload = false, callback } = option;
  // Check if the script is already loaded.
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    console.log("Script Already Loaded");
    if (!reload) {
      callback && callback(null, existingScript);
      return false;
    }
    existingScript.remove();
  }
  // Create a new script tag and load.
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
 * Dynamically load CSS Stylesheet.
 * @param {string} href - URL of the CSS file
 * @param {object} option - configuration options
 */
export const loadCSS = (href, option = {}) => {
  if (typeof document === "undefined" || !href) return false;
  // Get configuration options.
  const { reload = false, callback } = option;
  // Check if the CSS file is already loaded.
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) {
    console.log("CSS Already Loaded");
    if (!reload) {
      callback && callback(null, existingLink);
      return false;
    }
    existingLink.remove();
  }
  // Create a new link tag and load.
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
