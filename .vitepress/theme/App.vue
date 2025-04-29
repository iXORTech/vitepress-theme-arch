<template>
  <Background />
  <Loading />
  <Control />
  <Nav />
  <!-- Main Contents -->
  <main :class="['mian-layout', { loading: loadingStatus, 'is-post': isPostPage }]">
    <!-- 404 -->
    <NotFound v-if="page.isNotFound" />
    <!-- Home Page -->
    <Home v-if="frontmatter.layout === 'home'" showHeader />
    <!-- Pages -->
    <template v-else>
      <!-- Post Page -->
      <Post v-if="isPostPage" />
      <!-- Regular Page -->
      <Page v-else-if="!page.isNotFound" />
    </template>
  </main>
  <!-- Footer -->
  <FooterLink v-show="!loadingStatus" :showBar="isPostPage && !page.isNotFound" />
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

const route = useRoute();
const store = mainStore();
const { frontmatter, page, theme } = useData();
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
