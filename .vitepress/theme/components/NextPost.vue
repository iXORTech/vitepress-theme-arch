<template>
  <div
    v-if="nextPostData"
    :class="[
      'next-post',
      's-card',
      {
        fixed: infoPosition === 'fixed',
        show: infoPosition === 'fixed' && nextPostShow && !footerIsShow,
      },
    ]"
    @click="router.go(nextPostData?.regularPath)"
  >
    <span class="post-tip">
      {{ isNextPost ? i18n('components.next-post.read-next') : i18n('components.next-post.read-previous') }}
    </span>
    <span class="post-title">
      {{ nextPostData?.title || i18n('components.next-post.no-title-yet') }}
    </span>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { generateId } from "@/utils/commonTools";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const router = useRouter();
const store = mainStore();
const { theme, page } = useData();
const { footerIsShow, infoPosition } = storeToRefs(store);

// Post Data
const observer = ref(null);
const isNextPost = ref(true);
const nextPostShow = ref(false);
const nextPostData = ref(null);

const getNextPostData = () => {
  const { postData } = theme.value;
  const { filePath } = page.value;
  if (!postData || !filePath) return false;
  // Current post.
  const postId = generateId(filePath);
  const postIndex = postData.findIndex((post) => post.id === postId);
  // If there is a next post.
  if (postIndex >= 0 && postIndex < postData.length - 1) {
    nextPostData.value = postData[postIndex + 1];
    isNextPost.value = true;
    return true;
  }
  // If there is a previous post.
  else if (postIndex === postData.length - 1) {
    nextPostData.value = postData[postIndex - 1];
    isNextPost.value = false;
    return true;
  }
  else if (postIndex > 0) {
    nextPostData.value = postData[postIndex - 1];
    isNextPost.value = false;
    return true;
  }
  // If there is no post.
  nextPostData.value = null;
  return false;
};

const isShowNext = () => {
  const postDom = document.getElementById("page-content");
  if (!postDom) return false;
  if (observer.value) observer.value?.disconnect();
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      nextPostShow.value = entry.isIntersecting ? false : true;
    });
  });
  observer.value?.observe(postDom);
};

watch(
  () => router.route?.path,
  () => {
    getNextPostData();
    isShowNext();
  },
);

onMounted(() => {
  getNextPostData();
  isShowNext();
});

onBeforeUnmount(() => {
  if (observer.value) observer.value?.disconnect();
});
</script>

<style lang="scss" scoped>
.next-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--main-card-background);
  .post-tip {
    font-size: 14px;
    color: var(--main-font-second-color);
    padding-bottom: 8px;
    margin-bottom: 12px;
    border-bottom: 1px dashed var(--main-card-border);
    transition: color 0.3s;
  }
  .post-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &.fixed {
    position: fixed;
    right: 20px;
    bottom: 20px;
    opacity: 0;
    z-index: 100;
    width: 300px;
    transform: translateY(180px);
  }
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover {
    background-color: var(--main-color);
    border-color: var(--main-color);
    color: var(--main-card-background);
    box-shadow: 0 8px 16px -4px var(--main-color-bg);
    .post-tip {
      opacity: 0.8;
      color: var(--main-card-background);
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
