import { loadScript, loadCSS } from "./commonTools.mjs";
import { useI18n } from "./i18n.js";

const initFancybox = (themeConfig) => {
  const { i18n } = useI18n();
  try {
    const option = themeConfig.fancybox;
    if (!option.enable) return false;
    // Load CSS and Script
    loadCSS(option.css);
    loadScript(option.js, {
      callback: (error) => {
        if (error) {
          console.error("Image Fancy Box Initialization Failed: ", error);
          return false;
        }
        Fancybox.bind("[data-fancybox]", {
          hideScrollbar: true,
          Carousel: {
            transition: "slide",
          },
          Hash: false,
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "rotateCCW",
                "rotateCW",
                "flipX",
                "flipY",
              ],
              right: ["slideshow", "thumbs", "close"],
            },
          },
          l10n: {
            PANUP: i18n('utils.fancybox.panup'),
            PANDOWN: i18n('utils.fancybox.pandown'),
            PANLEFT: i18n('utils.fancybox.panleft'),
            PANRIGHT: i18n('utils.fancybox.panright'),
            ZOOMIN: i18n('utils.fancybox.zoomin'),
            ZOOMOUT: i18n('utils.fancybox.zoomout'),
            TOGGLEZOOM: i18n('utils.fancybox.togglezoom'),
            TOGGLE1TO1: i18n('utils.fancybox.toggle1to1'),
            ITERATEZOOM: i18n('utils.fancybox.iteratezoom'),
            ROTATECCW: i18n('utils.fancybox.rotateccw'),
            ROTATECW: i18n('utils.fancybox.rotatecw'),
            FLIPX: i18n('utils.fancybox.flipx'),
            FLIPY: i18n('utils.fancybox.flipy'),
            FITX: i18n('utils.fancybox.fitx'),
            FITY: i18n('utils.fancybox.fity'),
            RESET: i18n('utils.fancybox.reset'),
            TOGGLEFS: i18n('utils.fancybox.togglefs'),
            CLOSE: i18n('utils.fancybox.close'),
            NEXT: i18n('utils.fancybox.next'),
            PREV: i18n('utils.fancybox.prev'),
            MODAL: i18n('utils.fancybox.modal'),
            ERROR: i18n('utils.fancybox.error'),
            IMAGE_ERROR: i18n('utils.fancybox.image-error'),
            ELEMENT_NOT_FOUND: i18n('utils.fancybox.element-not-found'),
            AJAX_NOT_FOUND: i18n('utils.fancybox.ajax-not-found'),
            AJAX_FORBIDDEN: i18n('utils.fancybox.ajax-forbidden'),
            IFRAME_ERROR: i18n('utils.fancybox.iframe-error'),
            TOGGLE_ZOOM: i18n('utils.fancybox.toggle-zoom'),
            TOGGLE_THUMBS: i18n('utils.fancybox.toggle-thumbs'),
            TOGGLE_SLIDESHOW: i18n('utils.fancybox.toggle-slideshow'),
            TOGGLE_FULLSCREEN: i18n('utils.fancybox.toggle-fullscreen'),
            DOWNLOAD: i18n('utils.fancybox.download'),
          },
        });
      },
    });
  } catch (error) {
    console.error("Image Fancy Box Initialization Failed: ", error);
  }
};

export default initFancybox;
