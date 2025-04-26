import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      themeType: "auto",
      themeValue: "light",
      bannerType: "half",
      loadingStatus: true,
      scrollData: {
        height: 0,
        percentage: 0,
        direction: "down",
      },
      footerIsShow: false,
      controlShow: false,
      searchShow: false,
      showSeetings: false,
      mobileMenuShow: false,
      useRightMenu: true,
      backgroundBlur: false,
      fontFamily: "plex-serif",
      codeFontFamily: "plex-mono",
      fontSize: 16,
      infoPosition: "fixed",
      lastScrollY: 0,
      backgroundType: "patterns",
    };
  },
  getters: {},
  actions: {
    changeShowStatus(value, blur = true) {
      this[value] = !this[value];
      // Block Scrolling
      document.body.style.overflowY = this[value] ? "hidden" : "";
      // Background Blur
      const globalApp = document.getElementById("app");
      this[value] && this.backgroundBlur && blur
        ? globalApp.classList.add("blur")
        : globalApp.classList.remove("blur");
    },
    changeFontSize(isAdd = false) {
      if (isAdd) {
        if (this.fontSize < 20) {
          this.fontSize++;
        }
      } else {
        if (this.fontSize > 14) {
          this.fontSize--;
        }
      }
      const htmlElement = document.documentElement;
      htmlElement.style.fontSize = this.fontSize + "px";
    },
    changeThemeType() {
      this.themeType === "auto"
        ? (this.themeType = "dark")
        : this.themeType === "dark"
          ? (this.themeType = "light")
          : (this.themeType = "auto")
    },
  },
  // Data Persistence
  persist: [
    {
      key: "siteData",
      paths: [
        "themeType",
        "bannerType",
        "useRightMenu",
        "backgroundBlur",
        "backgroundType",
        "fontFamily",
        "codeFontFamily",
        "fontSize",
        "infoPosition",
      ],
    },
  ],
});
