<!-- Series Post Pages -->
<template>
  <div v-if="postMetaData" class="series-post">
    <div class="series-post-meta">
      <!-- Categories and Tags -->
      <div class="meta">
        <div class="categories" v-if="postMetaData.categories && postMetaData.categories.length">
          <a
            v-for="(item, index) in postMetaData.categories"
            :key="index"
            :href="`/categories/${item}`"
            class="cat-item"
          >
            <i class="font-awesome fa-solid fa-folder-open" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
        <div class="tags" v-if="postMetaData.tags && postMetaData.tags.length">
          <a
            v-for="(item, index) in postMetaData.tags"
            :key="index"
            :href="`/tags/${item}`"
            class="tag-item"
          >
            <i class="font-awesome fa-solid fa-hashtag" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
      </div>
      <!-- Series Navigation -->
      <div class="series-nav" v-if="seriesInfo">
        <a :href="`/series`" class="series-link">
          <i v-if="seriesInfo.icon" :class="['font-awesome', seriesInfo.icon]" />
          <i v-else class="font-awesome fa-solid fa-book" />
          <span class="series-name">{{ getLocalizedSeriesTitle(seriesInfo) }}</span>
        </a>
        <span class="series-position">
          <i class="font-awesome fa-solid fa-list-ol" />
          {{ currentPostIndex + 1 }} / {{ seriesInfo.postCount }}
        </span>
      </div>
      <h1 class="title">
        {{ localizedTitle || postMetaData.title || i18n("views.post.unnamed_post") }}
      </h1>
      <div class="other-meta">
        <span class="meta date">
          <i class="font-awesome fa-solid fa-calendar" />
          {{ formatTimestamp(postMetaData.date) }}
        </span>
        <span class="update meta">
          <i class="font-awesome fa-solid fa-clock" />
          {{ formatTimestamp(page?.lastUpdated || postMetaData.lastModified) }}
        </span>
        <!-- Post Hotness -->
        <span class="hot meta">
          <i class="font-awesome fa-solid fa-fire" />
          <span id="twikoo_visitors" class="artalk-pv-count waline-pageview-count">0</span>
        </span>
        <!-- Comment Count -->
        <span class="chat meta hover" @click="commentRef?.scrollToComments">
          <i class="font-awesome fa-solid fa-comments" />
          <span id="twikoo_comments" class="artalk-comment-count waline-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="series-post-content">
      <article class="series-post-article s-card">
        <!-- Info Expiry Reminder -->
        <div class="expired s-card" v-if="postMetaData?.expired >= 180">
          {{ i18n("views.post.info_expiry_reminder_before") }}
          <strong>{{ postMetaData?.expired }}</strong>
          {{ i18n("views.post.info_expiry_reminder_after") }}
        </div>
        <!-- "AI" Summary -->
        <ArticleGPT />
        <!-- Post Content -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- Post Reference -->
        <References />
        <!-- Copyright Info -->
        <Copyright v-if="frontmatter.copyright !== false" :postData="postMetaData" />
        <!-- Series Navigation at bottom -->
        <div class="series-nav-bottom" v-if="seriesInfo">
          <div class="nav-title">
            <i class="font-awesome fa-solid fa-book" />
            {{ i18n("views.series_post.series_navigation") }}
          </div>
          <div class="nav-items">
            <a v-if="prevPost" :href="prevPost.regularPath" class="nav-item prev s-card hover">
              <i class="font-awesome fa-solid fa-arrow-left" />
              <div class="nav-info">
                <span class="nav-label">{{ i18n("views.series_post.previous") }}</span>
                <span class="nav-post-title">{{ getLocalizedPostTitle(prevPost) }}</span>
              </div>
            </a>
            <div v-else class="nav-item prev disabled">
              <i class="font-awesome fa-solid fa-arrow-left" />
              <div class="nav-info">
                <span class="nav-label">{{ i18n("views.series_post.previous") }}</span>
                <span class="nav-post-title">{{ i18n("views.series_post.no_previous") }}</span>
              </div>
            </div>
            <a v-if="nextPost" :href="nextPost.regularPath" class="nav-item next s-card hover">
              <div class="nav-info">
                <span class="nav-label">{{ i18n("views.series_post.next") }}</span>
                <span class="nav-post-title">{{ getLocalizedPostTitle(nextPost) }}</span>
              </div>
              <i class="font-awesome fa-solid fa-arrow-right" />
            </a>
            <div v-else class="nav-item next disabled">
              <div class="nav-info">
                <span class="nav-label">{{ i18n("views.series_post.next") }}</span>
                <span class="nav-post-title">{{ i18n("views.series_post.no_next") }}</span>
              </div>
              <i class="font-awesome fa-solid fa-arrow-right" />
            </div>
          </div>
        </div>
        <!-- Other Info -->
        <div class="other-meta">
          <div class="all-tags" v-if="postMetaData.tags && postMetaData.tags.length">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/tags/${item}`"
              class="tag-item"
            >
              <i class="font-awesome fa-solid fa-hashtag" />
              <span class="name">{{ item }}</span>
            </a>
          </div>
          <a
            href="https://github.com/iXORTech/vitepress-theme-arch/issues"
            class="report"
            target="_blank"
          >
            <i class="font-awesome fa-solid fa-circle-exclamation"></i>
            {{ i18n("views.post.report") }}
          </a>
        </div>
        <RewardBtn />
        <!-- Comments -->
        <Comments ref="commentRef" />
      </article>
      <Aside showToc />
    </div>
  </div>
</template>

<script setup>
import { formatTimestamp } from "@/utils/helper";
import { generateId } from "@/utils/commonTools";
import initFancybox from "@/utils/initFancybox";
import { useI18n } from "@/utils/i18n";

const { i18n, currentLang } = useI18n();
const { page, theme, frontmatter } = useData();

const commentRef = ref(null);

// Find the series post data from seriesPostsData
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath);
  return theme.value.seriesPostsData?.find((item) => item.id === postId);
});

// Get the series info for this post
const seriesInfo = computed(() => {
  if (!postMetaData.value) return null;
  return theme.value.seriesData?.find((s) => s.id === postMetaData.value.seriesId);
});

// Get current post index in the series
const currentPostIndex = computed(() => {
  if (!seriesInfo.value || !postMetaData.value) return -1;
  return seriesInfo.value.posts.findIndex((p) => p.id === postMetaData.value.id);
});

// Get previous post in series
const prevPost = computed(() => {
  if (!seriesInfo.value || currentPostIndex.value <= 0) return null;
  return seriesInfo.value.posts[currentPostIndex.value - 1];
});

// Get next post in series
const nextPost = computed(() => {
  if (!seriesInfo.value || currentPostIndex.value < 0) return null;
  if (currentPostIndex.value >= seriesInfo.value.posts.length - 1) return null;
  return seriesInfo.value.posts[currentPostIndex.value + 1];
});

// Get localized title for the post
const localizedTitle = computed(() => {
  if (!postMetaData.value) return null;

  if (postMetaData.value.localizedTitle && postMetaData.value.localizedTitle[currentLang.value]) {
    return postMetaData.value.localizedTitle[currentLang.value];
  }
  return postMetaData.value.title;
});

// Get localized series title
const getLocalizedSeriesTitle = (series) => {
  if (series.localizedTitle && series.localizedTitle[currentLang.value]) {
    return series.localizedTitle[currentLang.value];
  }
  return series.title;
};

// Get localized post title
const getLocalizedPostTitle = (post) => {
  if (post.localizedTitle && post.localizedTitle[currentLang.value]) {
    return post.localizedTitle[currentLang.value];
  }
  return post.title;
};

onMounted(() => {
  initFancybox(theme.value);
});
</script>

<style lang="scss" scoped>
@use "../style/post.scss";

.series-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: fade-up 0.6s 0.1s backwards;

  .series-post-meta {
    padding: 2rem 0 3rem 18px;
    width: 100%;

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 1rem;

      .categories {
        .cat-item {
          align-items: center;
          padding: 6px 12px;
          margin-right: 6px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--main-mask-Inverse-background);
          opacity: 0.8;

          .font-awesome {
            margin-right: 6px;
          }

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);

            .font-awesome {
              color: var(--main-color);
            }
          }
        }
      }

      .tags {
        display: flex;
        flex-direction: row;
        align-items: center;

        .tag-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          opacity: 0.8;

          .font-awesome {
            margin-right: 4px;
            opacity: 0.6;
            font-weight: normal;
          }

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);

            .font-awesome {
              color: var(--main-color);
            }
          }
        }
      }
    }

    .series-nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .series-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 8px;
        background-color: var(--main-color-bg);
        color: var(--main-color);
        transition: all 0.3s;

        .font-awesome {
          margin-right: 6px;
        }

        &:hover {
          background-color: var(--main-color);
          color: var(--main-card-background);
        }
      }

      .series-position {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        opacity: 0.6;

        .font-awesome {
          margin-right: 6px;
        }
      }
    }

    .title {
      font-size: 2.2rem;
      line-height: 1.2;
      color: var(--main-font-color);
      margin: 1.4rem 0;
    }

    .other-meta {
      display: flex;
      flex-direction: row;
      align-items: center;

      .meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 8px;
        opacity: 0.8;

        .font-awesome {
          margin-right: 6px;
          transition: color 0.3s;
        }

        &.date {
          padding-left: 0;
        }

        &.hot {
          .font-awesome {
            font-size: 18px;
          }
        }

        &.hover {
          transition:
            color 0.3s,
            background-color 0.3s;
          cursor: pointer;

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);

            .font-awesome {
              color: var(--main-color);
            }
          }
        }
      }
    }
  }

  .series-post-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    animation: fade-up 0.6s 0.3s backwards;

    .series-post-article {
      width: calc(100% - 300px);
      padding: 1rem 2.2rem 2.2rem 2.2rem;
      user-select: text;
      cursor: auto;

      &:hover {
        border-color: var(--main-card-border);
      }

      .expired {
        margin: 1.2rem 0 2rem 0;
        padding: 0.8rem 1.2rem;
        border-left: 6px solid var(--main-warning-color);
        border-radius: 6px 16px 16px 6px;
        user-select: none;

        strong {
          color: var(--main-warning-color);
        }
      }

      .series-nav-bottom {
        margin: 2rem 0;
        padding: 1.5rem;
        border-radius: 16px;
        background-color: var(--main-card-second-background);

        .nav-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 1rem;
          opacity: 0.8;

          .font-awesome {
            color: var(--main-color);
          }
        }

        .nav-items {
          display: flex;
          flex-direction: row;
          gap: 1rem;

          .nav-item {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 1rem;
            border-radius: 12px;
            gap: 0.75rem;
            transition: all 0.3s;

            &.prev {
              justify-content: flex-start;
            }

            &.next {
              justify-content: flex-end;
              text-align: right;
            }

            &.disabled {
              opacity: 0.4;
              cursor: not-allowed;
              background-color: var(--main-card-border);
            }

            .font-awesome {
              font-size: 1.25rem;
              flex-shrink: 0;
            }

            .nav-info {
              display: flex;
              flex-direction: column;
              min-width: 0;

              .nav-label {
                font-size: 0.75rem;
                opacity: 0.6;
                text-transform: uppercase;
              }

              .nav-post-title {
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            &:not(.disabled):hover {
              .nav-post-title {
                color: var(--main-color);
              }
            }
          }
        }
      }

      .other-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        opacity: 0.8;

        .all-tags {
          display: flex;
          flex-direction: row;
          align-items: center;

          .tag-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            background-color: var(--main-card-border);
            margin-right: 12px;

            .font-awesome {
              margin-right: 4px;
              opacity: 0.6;
              font-weight: normal;
            }

            &:hover {
              color: var(--main-color);
              background-color: var(--main-color-bg);

              .font-awesome {
                color: var(--main-color);
              }
            }
          }
        }

        .report {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--main-card-border);

          .font-awesome {
            margin-right: 6px;
          }

          &:hover {
            color: #efefef;
            background-color: var(--main-error-color);

            .font-awesome {
              color: #efefef;
            }
          }
        }
      }
    }

    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }

    @media (max-width: 1200px) {
      .series-post-article {
        width: 100%;
      }

      .main-aside {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    .series-post-meta {
      padding: 4rem 1.5rem;

      .meta {
        justify-content: center;

        .categories {
          margin-right: 0;
        }

        .tags {
          display: none;
        }
      }

      .series-nav {
        justify-content: center;
        flex-wrap: wrap;
      }

      .title {
        font-size: 1.6rem;
        text-align: center;
        line-height: 40px;
      }

      .other-meta {
        justify-content: center;
      }
    }

    .series-post-content {
      .series-post-article {
        border: none;
        padding: 20px 30px;

        .series-nav-bottom {
          padding: 1rem;

          .nav-items {
            flex-direction: column;

            .nav-item {
              &.next {
                flex-direction: row-reverse;
                justify-content: flex-start;
                text-align: left;
              }
            }
          }
        }

        .other-meta {
          margin: 1rem 0 2rem 0;
          flex-direction: column;

          .all-tags {
            flex-wrap: wrap;

            .tag-item {
              margin-top: 12px;
            }
          }

          .report {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
