<!-- Post Pages -->
<template>
  <div v-if="postMetaData" class="post">
    <div class="post-meta">
      <div class="meta">
        <div class="categories">
          <a
            v-for="(item, index) in postMetaData.categories"
            :key="index"
            :href="`/pages/categories/${item}`"
            class="cat-item"
          >
            <i class="font-awesome fa-solid fa-folder-open" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
        <div class="tags">
          <a
            v-for="(item, index) in postMetaData.tags"
            :key="index"
            :href="`/pages/tags/${item}`"
            class="tag-item"
          >
            <i class="font-awesome fa-solid fa-hashtag" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
      </div>
      <h1 class="title">
        {{ postMetaData.title || i18n('views.post.unnamed_post') }}
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
          <span id="twikoo_visitors" class="artalk-pv-count">0</span>
        </span>
        <!-- Comment Count -->
        <span class="chat meta hover" @click="commentRef?.scrollToComments">
          <i class="font-awesome fa-solid fa-comments" />
          <span id="twikoo_comments" class="artalk-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="post-content">
      <article class="post-article s-card">
        <!-- Info Expiry Reminder -->
        <div class="expired s-card" v-if="postMetaData?.expired >= 180">
          {{ i18n('views.post.info_expiry_reminder_before') }} <strong>{{ postMetaData?.expired }}</strong> {{ i18n('views.post.info_expiry_reminder_after') }}
        </div>
        <!-- "AI" Summary -->
        <ArticleGPT />
        <!-- Post Content -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- Post Reference -->
        <References />
        <!-- Copyright Info -->
        <Copyright v-if="frontmatter.copyright !== false" :postData="postMetaData" />
        <!-- Other Info -->
        <div class="other-meta">
          <div class="all-tags">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/pages/tags/${item}`"
              class="tag-item"
            >
              <i class="font-awesome fa-solid fa-hashtag" />
              <span class="name">{{ item }}</span>
            </a>
          </div>
          <a
            href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
            class="report"
            target="_blank"
          >
            <i class="font-awesome fa-solid fa-circle-exclamation"></i>
            {{ i18n('views.post.report') }}
          </a>
        </div>
        <RewardBtn />
        <!-- Next Post -->
        <NextPost />
        <!-- Related Posts -->
        <RelatedPost />
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
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const { page, theme, frontmatter } = useData();

const commentRef = ref(null);

// Post Related Metadata
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath);
  return theme.value.postData.find((item) => item.id === postId);
});

onMounted(() => {
  initFancybox(theme.value);
});
</script>

<style lang="scss" scoped>
@use "../style/post.scss";

.post {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: fade-up 0.6s 0.1s backwards;
  .post-meta {
    padding: 2rem 0 3rem 18px;
    width: 100%;
    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      .categories {
        margin-right: 12px;
        .cat-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
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
  .post-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    animation: fade-up 0.6s 0.3s backwards;
    .post-article {
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
      .post-article {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
  @media (max-width: 768px) {
    .post-meta {
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
      .title {
        font-size: 1.6rem;
        text-align: center;
        line-height: 40px;
      }
      .other-meta {
        justify-content: center;
      }
    }
    .post-content {
      .post-article {
        border: none;
        padding: 20px 30px;
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
