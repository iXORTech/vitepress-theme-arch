import { mainStore } from "@/store";

let loadingTimer = null;
let lastPathName = null;
let isOnlyAfter = false;

/**
 * Check if the link to go to is the current page.
 * @return {boolean} true when it is.
 */
export const isSamePage = (to) => {
  if (typeof window === "undefined") return false;
  const toURL = new URL(to, window.location.origin);
  const targetPathWithoutHash = toURL.pathname;
  const currentURL = new URL(window.location.href);
  const currentPathWithoutHash = currentURL.pathname;
  return targetPathWithoutHash === currentPathWithoutHash;
};

// Before & After Route Change
export const routeChange = (type, to) => {
  if (typeof window === "undefined") return false;
  // Before route change
  if (type === "before") {
    console.log("Before Routing ", to);
    isOnlyAfter = false;
    // const isSame = isSamePage(to);
    lastPathName = new URL(to, window.location.origin).pathname;
    // Start Animation
    changeLoading({ always: true });
  }
  // After route change
  else if (type === "after") {
    console.log("After Routing ", to);
    const isSame = isSamePage(to);
    const pathName = new URL(to, window.location.origin).pathname;
    if (isSame && lastPathName === pathName) {
      console.log("Same Page");
      if (!isOnlyAfter) changeLoading();
      return false;
    } else {
      changeLoading();
    }
    isOnlyAfter = true;
    lastPathName = new URL(to, window.location.origin).pathname;
  }
};

const changeLoading = (option = {}) => {
  const store = mainStore();
  const { status = true, always = false } = option;
  store.loadingStatus = status;
  if (always) return;
  loadingTimer = setTimeout(
    () => {
      console.log("Loading Animation Timer Ended");
      store.loadingStatus = false;
      clearTimeout(loadingTimer);
    },
    Math.floor(Math.random() * (800 - 260 + 1)) + 260,
  );
};
