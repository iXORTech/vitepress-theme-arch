<template>
  <Background />
  <Loading />
  <Control />
  <Nav />
  <!-- Main Contents -->
  <main :class="['mian-layout', { loading: loadingStatus, 'is-post': isPostPage || isSeriesPost }]">
    <!-- 404 -->
    <NotFound v-if="page.isNotFound" />
    <!-- Home Page -->
    <Home v-if="frontmatter.layout === 'home'" showHeader />
    <!-- Pages -->
    <template v-else>
      <!-- Post Page -->
      <Post v-if="isPostPage" />
      <!-- Series Post Page -->
      <SeriesPost v-else-if="isSeriesPost" />
      <!-- Regular Page -->
      <Page v-else-if="!page.isNotFound" />
    </template>
  </main>
  <!-- Footer -->
  <FooterLink v-show="!loadingStatus" :showBar="(isPostPage || isSeriesPost) && !page.isNotFound" />
  <Footer v-show="!loadingStatus" />
  <!-- Menu -->
  <Teleport to="body">
    <div :class="['left-menu', { hidden: footerIsShow }]">
      <Settings />
    </div>
  </Teleport>
  <RightMenu ref="rightMenuRef" />
  <!-- Message -->
  <Message />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { calculateScroll } from "@/utils/helper";
import { useI18n } from "@/utils/i18n";
import { generateId } from "@/utils/commonTools";

const route = useRoute();
const store = mainStore();
const { frontmatter, page, theme, site } = useData();
const { currentLang, getLocalizedSiteTitle, getLocalizedSiteDescription } = useI18n();
const {
  loadingStatus,
  footerIsShow,
  themeValue,
  themeType,
  backgroundType,
  fontFamily,
  codeFontFamily,
  fontSize,
} = storeToRefs(store);

// Right Click Menu
const rightMenuRef = ref(null);

// Check if the page is a post.
const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return routePath.includes("/posts/");
});

// Check if the page is a series post.
const isSeriesPost = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return (
    routePath.includes("/series/") &&
    !routePath.endsWith("/series") &&
    !routePath.endsWith("/series/")
  );
});

// Update document title when language changes
watchEffect(() => {
  // Only run in client side
  if (typeof document === "undefined") return;

  let pageTitle = page.value.title;
  const siteTitle = getLocalizedSiteTitle();
  const siteDescription = getLocalizedSiteDescription();

  // For post pages, get localized title from post data
  if (isPostPage.value && page.value.relativePath) {
    const postId = generateId(page.value.relativePath);
    const post = theme.value.postData?.find((item) => item.id === postId);

    if (post?.localizedTitle && post.localizedTitle[currentLang.value]) {
      pageTitle = post.localizedTitle[currentLang.value];
    }
  }
  // For series post pages, get localized title from series posts data
  else if (isSeriesPost.value && page.value.relativePath) {
    const postId = generateId(page.value.relativePath);
    const post = theme.value.seriesPostsData?.find((item) => item.id === postId);

    if (post?.localizedTitle && post.localizedTitle[currentLang.value]) {
      pageTitle = post.localizedTitle[currentLang.value];
    }
  }
  // For regular pages, get localized title from frontmatter
  else if (
    frontmatter.value?.localizedTitle &&
    frontmatter.value.localizedTitle[currentLang.value]
  ) {
    pageTitle = frontmatter.value.localizedTitle[currentLang.value];
  }

  // Set document title with localized site title
  if (pageTitle) {
    document.title = `${pageTitle} | ${siteTitle}`;
  } else {
    // If there's no page title, just use the localized site title
    document.title = siteTitle;
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && siteDescription) {
    metaDescription.setAttribute("content", siteDescription);
  } else if (siteDescription) {
    // Create meta description if it doesn't exist
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = siteDescription;
    document.head.appendChild(meta);
  }
});

// Open Right Click Menu
const openRightMenu = (e) => {
  rightMenuRef.value?.openRightMenu(e);
};

// Change Theme Mode
const changeSiteThemeType = () => {
  const themeClasses = {
    dark: "dark",
    light: "light",
    auto: "auto",
  };
  const htmlElement = document.documentElement;
  console.log("Current Theme Mode: ", themeType.value);
  // Clean all the old theme classes.
  Object.values(themeClasses).forEach((themeClass) => {
    htmlElement.classList.remove(themeClass);
  });
  // Add new classes.
  if (themeType.value === "auto") {
    // Change theme mode based on system settings.
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const autoThemeClass = systemPrefersDark ? themeClasses.dark : themeClasses.light;
    htmlElement.classList.add(autoThemeClass);
    themeValue.value = autoThemeClass;
  } else if (themeClasses[themeType.value]) {
    htmlElement.classList.add(themeClasses[themeType.value]);
    themeValue.value = themeClasses[themeType.value];
  }
  if (backgroundType.value === "image") {
    htmlElement.classList.add("image");
  } else {
    htmlElement.classList.remove("image");
  }
};

// Change the font for the site.
const changeSiteFont = () => {
  try {
    console.log("Current font: ", fontFamily.value);
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("plex-serif", "plex-sans");
    htmlElement.classList.add(fontFamily.value);
    // For Code Blocks Powered by Shiki and Inline Code
    const codeHtmlElements = document.getElementsByTagName("code");
    for (let i = 0; i < codeHtmlElements.length; i++) {
      const codeHtmlElement = codeHtmlElements[i];
      codeHtmlElement.classList.remove(
        "plex-mono",
        "monaspace-neon",
        "monaspace-argon",
        "monaspace-xenon",
        "monaspace-radon",
        "monaspace-krypton",
      );
      codeHtmlElement.classList.add(codeFontFamily.value);
    }
    htmlElement.style.fontSize = fontSize.value + "px";
  } catch (error) {
    console.error("Font Switch Failed: ", error);
  }
};

// Listen to change in settings.
watch(
  () => [themeType.value, backgroundType.value],
  () => changeSiteThemeType(),
);
watch(
  () => fontFamily.value,
  () => changeSiteFont(),
);
watch(
  () => codeFontFamily.value,
  () => changeSiteFont(),
);

onMounted(() => {
  console.log(frontmatter.value, page.value, theme.value);
  changeSiteThemeType();
  changeSiteFont();
  window.addEventListener("scroll", calculateScroll);
  window.addEventListener("contextmenu", openRightMenu);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeSiteThemeType);
  // Inject SwiperJS script and initialize Swiper components.
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  script.onload = () => {
    const swiper = new Swiper(".swiper", {
      effect: "cards",
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };
  document.head.appendChild(script);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", calculateScroll);
  window.removeEventListener("contextmenu", openRightMenu);
});
</script>

<style lang="scss" scoped>
.mian-layout {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  animation: show 0.5s forwards;
  animation-duration: 0.5s;
  display: block;

  &.loading {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    &.is-post {
      padding: 0;
    }
  }
}

.left-menu {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1002;
  transition:
    opacity 0.3s,
    transform 0.3s;

  &.hidden {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
