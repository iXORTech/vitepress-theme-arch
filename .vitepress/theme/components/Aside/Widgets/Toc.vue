<template>
  <!-- Table of Contents -->
  <div v-if="tocData && tocData?.length" class="toc s-card">
    <div class="toc-title">
      <i class="font-awesome fa-solid fa-bars" />
      <span class="name">{{ i18n('components.aside.widgets.toc.toc') }}</span>
    </div>
    <div id="toc-all" class="toc-list" :style="{ '--height': activeTocHeight + 'px' }">
      <span
        v-for="(item, index) in tocData"
        :key="index"
        :id="'toc-' + item.id"
        :class="[
          'toc-item',
          item.type,
          { active: item.id === activeHeader || (index === 0 && !activeHeader) },
        ]"
        @click="scrollToHeader(item.id)"
      >
        {{ item.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { throttle } from "lodash-es";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const route = useRoute();
const store = mainStore();

const tocData = ref(null);
const postDom = ref(null);
const activeHeader = ref(null);
const activeTocHeight = ref(0);

const getAllTitle = () => {
  try {
    postDom.value = document.getElementById("page-content");
    if (!postDom.value) return false;
    const headers = Array.from(postDom.value.querySelectorAll("h2, h3")).filter(
      (header) => header.parentElement.tagName.toLowerCase() === "div",
    );
    return headers;
  } catch (error) {
    console.error("Failed Getting All Title: ", error);
  }
};

const generateDirData = () => {
  const headers = getAllTitle();
  if (!headers) return false;
  const nestedData = [];
  headers.forEach((header) => {
    const headerObj = {
      id: header.id,
      type: header.tagName,
      text: header.textContent?.replace(/\u200B/g, "").trim(),
    };
    nestedData.push(headerObj);
  });
  tocData.value = nestedData;
};

// Highlight the corresponding TOC item
const activeTocItem = throttle(
  () => {
    if (!tocData.value) return false;
    const headers = getAllTitle();
    if (!headers) return false;
    const bufferheight = 120;
    for (let header of headers) {
      const rect = header.getBoundingClientRect();
      // Check if the header is in the viewport
      if (rect.top - bufferheight <= 0 && rect.bottom + bufferheight >= 0) {
        // Highlight the corresponding TOC item
        activeHeader.value = header.id;
      }
    }
  },
  100,
  { leading: true, trailing: false },
);

// Scroll to title.
const scrollToHeader = (id) => {
  try {
    const headerDom = document.getElementById(id);
    if (!headerDom || !postDom.value) return false;
    const headerTop = headerDom.offsetTop;
    const scrollHeight = headerTop + postDom.value.offsetTop - 80;
    window.scroll({ top: scrollHeight, behavior: "smooth" });
  } catch (error) {
    console.error("TOC Scroll Failed: ", error);
  }
};

// Scroll back to top.
watch(
  () => store.scrollData.percentage,
  (val) => {
    if (val === 0 && tocData.value) {
      console.log("Scrolling back to top");
      // 所有标题
      const headers = getAllTitle();
      if (!headers) return false;
      activeTocHeight.value = 0;
      activeHeader.value = headers[0]?.id;
    }
  },
);

// Compute the active TOC item.
watch(
  () => activeHeader.value,
  (val) => {
    const tocAllDom = document.getElementById("toc-all");
    const activeTocItem = document.getElementById("toc-" + val);
    if (!tocAllDom || !activeTocItem) return false;
    activeTocHeight.value = activeTocItem?.offsetTop - 2 || 0;
    tocAllDom?.scrollTo({ top: activeTocHeight.value - 80, behavior: "smooth" });
  },
);

watch(
  () => route.path,
  () => generateDirData(),
);

onMounted(() => {
  generateDirData();
  window.addEventListener("scroll", activeTocItem);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", activeTocItem);
});
</script>

<style lang="scss" scoped>
.toc {
  position: relative;
  padding: 0 !important;
  overflow: hidden;
  .toc-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 18px;
    height: 58px;
    .font-awesome {
      margin-right: 8px;
      font-weight: bold;
      opacity: 0.6;
    }
    .name {
      font-weight: bold;
    }
  }
  .toc-list {
    position: relative;
    padding: 20px;
    padding-top: 0;
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    max-height: calc(70vh - 58px);
    overflow: auto;
    .toc-item {
      margin: 4px 0;
      padding: 6px 12px;
      border-radius: 8px;
      opacity: 0.6;
      transition:
        color 0.3s,
        opacity 0.3s,
        font-size 0.3s,
        background-color 0.3s;
      cursor: pointer;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &.H2 {
        font-weight: bold;
      }
      &.H3 {
        font-size: 14px;
        margin-left: 20px;
      }
      &.active {
        opacity: 1;
        color: var(--main-color);
        background-color: var(--main-color-bg);
        &.H2 {
          font-size: 18px;
        }
        &.H3 {
          font-size: 16px;
        }
      }
      &:hover {
        opacity: 1;
        color: var(--main-color);
        background-color: var(--main-color-bg);
      }
    }
    &::after {
      content: "";
      position: absolute;
      left: 12px;
      top: var(--height);
      width: 4px;
      height: 20px;
      margin: 8px 0;
      background-color: var(--main-color);
      border-radius: 8px;
      transition: top 0.3s;
    }
  }
  &::before {
    content: "";
    position: absolute;
    left: 12px;
    bottom: 20px;
    width: 4px;
    height: calc(100% - 78px);
    background-color: var(--main-card-border);
    border-radius: 8px;
  }
}
</style>
