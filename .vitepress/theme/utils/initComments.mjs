import { loadScript, loadCSS } from "./commonTools.mjs";

const initComments = async (themeConfig) => {
  try {
    const option = themeConfig.comment;
    const commentType = option.type;
    if (!option.enable) return false;
    const server = option[commentType].server;
    console.log("Loading ", commentType, server);
    switch (commentType) {
      case "artalk":
        // Load Resources
        await loadCSS(`${server}/dist/Artalk.css`);
        return await new Promise((resolve, reject) => {
          loadScript(`${server}/dist/Artalk.js`, {
            callback: () => {
              if (typeof Artalk === "object") {
                resolve(Artalk);
              } else {
                reject(new Error("Artalk Initialization Failed"));
              }
            },
          });
        });
      case "twikoo":
        // Load Resources
        return await new Promise((resolve, reject) => {
          loadScript(option[commentType].js, {
            callback: () => {
              if (typeof twikoo === "object") {
                resolve(twikoo);
              } else {
                reject(new Error("Twikoo Initialization Failed"));
              }
            },
          });
        });
      default:
        return false;
    }
  } catch (error) {
    console.error(`${commentType} Initialization Failed`, error);
    throw error;
  }
};

export default initComments;
