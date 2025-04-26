import { useI18n } from '@/utils/i18n'

/**
 * Get Info for Given Website
 * @param {string} url - Website URL
 * @returns {Promise<{iconUrl: string, description: string}>}
 */
export const getSiteInfo = async (url) => {
  const { i18n } = useI18n()

  const details = {
    iconUrl: null,
    title: null,
    description: null,
  };
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const titleElement = doc.querySelector("title");
    details.title = titleElement ? titleElement.textContent : i18n('api.get-site-info.no-title');
    let iconLink =
      doc.querySelector("link[rel='shortcut icon']") || doc.querySelector("link[rel='icon']");
    if (iconLink) {
      details.iconUrl = new URL(iconLink.getAttribute("href"), url).href;
    } else {
      details.iconUrl = new URL("/favicon.ico", url).href;
    }
    const metaDescription = doc.querySelector("meta[name='description']");
    details.description = metaDescription ? metaDescription.content : i18n('api.get-site-info.no-description');
  } catch (error) {
    console.error("Get Website Info Error: ", error);
  }
  return details;
};
