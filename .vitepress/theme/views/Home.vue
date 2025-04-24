<!-- Home Page -->
<template>
  <div class="home">
    <Banner v-if="showHeader" :height="store.bannerType" />
    <div class="home-content">
      <div class="posts-content">
        <!-- All Categories or Tags  -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" />
        <!-- List of Posts -->
        <PostList :listData="postData" />
        <!-- Page for Post List -->
        <Pagination
          :total="allListTotal"
          :page="Number(page)"
          :limit="postSize"
          :useParams="showCategories || showTags ? true : false"
          :routePath="
            showCategories
              ? `/pages/categories/${showCategories}`
              : showTags
                ? `/pages/tags/${showTags}`
                : ''
          "
        />
      </div>
      <!-- Sidebar -->
      <Aside />
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const { theme } = useData();
const store = mainStore();
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Number,
    default: 1,
  },
  showCategories: {
    type: [null, String],
    default: null,
  },
  showTags: {
    type: [null, String],
    default: null,
  },
});

// Number of Posts per Page
const postSize = theme.value.postSize;

// Number of Posts in Total
const allListTotal = computed(() => {
  const data = props.showCategories
    ? theme.value.categoriesData[props.showCategories]?.articles
    : props.showTags
      ? theme.value.tagsData[props.showTags]?.articles
      : theme.value.postData;
  return data ? data.length : 0;
});

// Get Number of Current Page
const getCurrentPage = () => {
  if (props.showCategories || props.showTags) {
    if (typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (!page) return 0;
    const currentPage = Number(page);
    return currentPage ? currentPage - 1 : 0;
  }
  return props.page ? props.page - 1 : 0;
};

// Compute Data Related to Posts
const postData = computed(() => {
  const page = getCurrentPage();
  console.log("当前页数：", page);
  let data = null;
  // Category Data
  if (props.showCategories) {
    data = theme.value.categoriesData[props.showCategories]?.articles;
  }
  // Tag Data
  else if (props.showTags) {
    data = theme.value.tagsData[props.showTags]?.articles;
  }
  // Post Data
  else {
    data = theme.value.postData;
  }
  // Return All Data
  return data ? data.slice(page * postSize, page * postSize + postSize) : [];
});

// Restore Y Scroll Position
const restoreScrollY = (val) => {
  if (typeof window === "undefined" || val) return false;
  const scrollY = store.lastScrollY;
  nextTick().then(() => {
    console.log("Y Scroll Position: ", scrollY);
    // Smooth Scroll to Y Position
    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
    // Clear Scroll Position
    store.lastScrollY = 0;
  });
};

// Listen for End of Loading
watch(
  () => store.loadingStatus,
  (val) => restoreScrollY(val),
);
</script>

<style lang="scss" scoped>
.home {
  .home-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    .posts-content {
      width: calc(100% - 300px);
      transition: width 0.3s;
    }
    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }
    @media (max-width: 1200px) {
      .posts-content {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
}
</style>
