import { mainStore } from "@/store";
import { throttle } from "lodash-es";
import { useI18n } from '@/utils/i18n'

/**
 * Calculate Scroll Position and Percentage
 */
export const calculateScroll = throttle(
  () => {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") return false;
      const store = mainStore();
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = ((scrollY / totalHeight) * 100).toFixed(0);
      const scrollDirection = scrollY > store.scrollData.height ? "down" : "up";
      store.scrollData = {
        height: Number(scrollY.toFixed(0)),
        percentage: Number(scrollPercentage),
        direction: scrollDirection,
      };
    } catch (error) {
      console.error("Error Calculating Scroll Position: ", error);
    }
  },
  300,
  true,
);

/**
 * Smooth Scrolling to a Target Element or Height
 * @param {number|HTMLElement} target - target element or height to scroll to
 */
export const smoothScrolling = (target = 0) => {
  try {
    if (typeof window === "undefined") return false;
    if (typeof target === "number") {
      // Sxroll to a specific height
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      // Scroll to a specific element
      const top = target.getBoundingClientRect().top - 80;
      window.scrollTo({ top, behavior: "smooth" });
    } else if (typeof target === "string" && target.startsWith("#")) {
      // Scroll to a specific element by ID
      const element = document.querySelector(target);
      if (element) {
        const top = element.getBoundingClientRect().top - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    console.error("Error Smooth Scrolling", error);
  }
};

/**
 * Format Timestamp to Date String
 * If the timestamp represents time within 7 days, return 'x days ago'
 * If the timestamp represents time within this year, return 'month/day'
 * If the timestamp represents date within another year, return 'year/month/day'
 * If the timestamp represents time within today, return 'today'
 * If the timestamp represents time within yesterday, return 'yesterday'
 * @param {number} timestamp - timestamp in milliseconds
 * @return {string} i18n key of the formatted date string
 */
export const formatTimestamp = (timestamp) => {
  const { i18n } = useI18n()

  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);
  let targetDate = new Date(timestamp);
  if (targetDate >= yesterday && targetDate < today) {
    return i18n('utils.helper.format-timestamp.yesterday');
  } else {
    let difference = Math.floor((today - targetDate) / (1000 * 60 * 60 * 24));
    if (difference <= 0) {
      return i18n('utils.helper.format-timestamp.today');
    } else if (difference < 7) {
      return `${difference}${i18n('utils.helper.format-timestamp.days-ago')}`;
    } else {
      let year = targetDate.getFullYear();
      let month = targetDate.getMonth() + 1;
      let day = targetDate.getDate();
      if (year === now.getFullYear()) {
        return `${month}/${day}`;
      } else {
        return `${year}/${month}/${day}`;
      }
    }
  }
};

/**
 * Get the difference in days between today and a given date.
 * @param {string} dateStr - Target date from today.
 * @returns {number} Difference in days.
 */
export const daysFromNow = (dateStr) => {
  const currentDate = new Date();
  const inputDate = new Date(dateStr);
  const timeDiff = currentDate - inputDate;
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff;
};

/**
 * Go to a random article.
 * @param {Object} postData - Data about posts.
 * @returns {string} - The path of the random post.
 */
let lastIndex = -1;
export const shufflePost = (postData) => {
  let randomIndex;
  do {
    // Randomly generate an index.
    randomIndex = Math.floor(Math.random() * postData.length);
  } while (randomIndex === lastIndex && postData.length > 1);
  lastIndex = randomIndex;
  // Get the random post.
  const randomPost = postData[randomIndex];
  console.log(randomPost);
  // Go to the random post.
  return randomPost.regularPath;
};

/**
 * Copy text to clipboard.
 * @param {string} data Text to be copied.
 */
export const copyText = async (data) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(data);
      $message.success(i18n('utils.helper.copy-text.success'));
    } catch (error) {
      console.error("Error when copying to clipboard: ", error);
      $message.error(i18n('utils.helper.copy-text.failed'));
    }
  } else {
    // If navigator.clipboard is not supported.
    const textArea = document.createElement("textarea");
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      $message.success(i18n('utils.helper.copy-text.success'));
    } catch (err) {
      console.error("Error when copying to clipboard: ", err);
      $message.error(i18n('utils.helper.copy-text.failed'));
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

/**
 * Copy image to clipboard.
 * @param {string} imageURL The URL of the image to be copied.
 */
export const copyImage = async (imageURL) => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not supported");
    return;
  }
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("Image copied to clipboard");
    $message.success(i18n('utils.helper.copy-image.success'));
  } catch (error) {
    console.error("Error copying image: ", error);
    $message.error(i18n('utils.helper.copy-image.success'));
  }
};

/**
 * Download image from a given URL.
 * @param {string} imageUrl The URL of the image to be downloaded.
 */
export const downloadImage = (imageUrl) => {
  try {
    // Get the date and use it as the filename.
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, "-");
    const imageName = `image-${timestamp}.jpg`;
    const anchor = document.createElement("a");
    anchor.download = imageName;
    anchor.href = imageUrl;
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (error) {
    console.error("Error downloading image: ", error);
    $message.error(i18n('utils.helper.download-image.failed'));
  }
};

/**
 * Get greeting message based on the current time.
 * @returns {string} the i18n key of the greeting message.
 */
export const getGreetings = () => {
  const hour = new Date().getHours();
  let hello;
  if (hour < 6) {
    hello = 'components.aside.widgets.hello.greetings.1';
  } else if (hour < 9) {
    hello = 'components.aside.widgets.hello.greetings.2';
  } else if (hour < 12) {
    hello = 'components.aside.widgets.hello.greetings.3';
  } else if (hour < 14) {
    hello = 'components.aside.widgets.hello.greetings.4';
  } else if (hour < 17) {
    hello = 'components.aside.widgets.hello.greetings.5';
  } else if (hour < 19) {
    hello = 'components.aside.widgets.hello.greetings.6';
  } else if (hour < 22) {
    hello = 'components.aside.widgets.hello.greetings.7';
  } else {
    hello = 'components.aside.widgets.hello.greetings.8';
  }
  return hello;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
