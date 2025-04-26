<template>
  <div v-if="relatedData" class="related-post">
    <div class="title">
      <span class="name">
        <i class="font-awesome fa-solid fa-star"></i>
        {{ i18n('components.related-post.related-posts') }}
      </span>
      <span class="shuffle" @click="router.go(shufflePost(theme.postData))">
        {{ i18n('components.related-post.go-to-random-post') }}
      </span>
    </div>
    <PostList :listData="relatedData" simple />
  </div>
</template>

<script setup>
import { generateId } from "@/utils/commonTools";
import { shufflePost } from "@/utils/helper";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const router = useRouter();
const { theme, page, frontmatter } = useData();

// Post Data
const relatedData = ref(null);

// Get Posts in the Same Category
const getRelatedData = () => {
  const catName = frontmatter.value.categories?.[0];
  const postData = theme.value.categoriesData?.[catName]?.articles;
  const postId = generateId(page.value?.filePath);
  const filteredPosts = postData.filter((post) => post.id !== postId);
  relatedData.value = filteredPosts.slice(0, 2);
  if (relatedData.value.length === 0) {
    relatedData.value = null;
  }
};

watch(
  () => router.route?.path,
  () => {
    getRelatedData();
  },
);

onMounted(() => {
  getRelatedData();
});
</script>

<style lang="scss" scoped>
.related-post {
  margin-top: 1rem;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 3rem 0 1rem 0;
    padding: 0 6px;
    .name {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      .font-awesome {
        font-size: 26px;
        font-weight: normal;
        margin-right: 8px;
      }
    }
    .shuffle {
      opacity: 0.6;
      font-size: 14px;
      transition:
        color 0.3s,
        opacity 0.3s;
      cursor: pointer;
      &:hover {
        opacity: 1;
        color: var(--main-color);
      }
    }
  }
}
</style>
