import { themeConfig } from "./theme/assets/themeConfig.mjs";
import { existsSync } from "fs";
import path from "path";

/**
 * Get config file.
 */
export const getThemeConfig = async () => {
  try {
    // The absolute path to the config file.
    const configPath = path.resolve(__dirname, "../themeConfig.mjs");
    if (existsSync(configPath)) {
      // Dynamically import the user configuration file when it exists.
      const userConfig = await import("../themeConfig.mjs");
      return Object.assign(themeConfig, userConfig?.themeConfig || {});
    } else {
      // Return default configuration if the file does not exist.
      console.warn("User configuration file not found, using default themeConfig.");
      return themeConfig;
    }
  } catch (error) {
    console.error("An error occurred while loading the configuration:", error);
    return themeConfig;
  }
};
