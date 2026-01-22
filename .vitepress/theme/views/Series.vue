<!-- Series Page - Display all series and their posts -->
<template>
  <div class="series-page">
    <div class="title">
      <h1 class="title-name">{{ i18n("views.series.all_series") }}</h1>
      <span class="title-num">
        {{ i18n("views.series.series_count_before") }} {{ theme.seriesData?.length || 0 }}
        {{ i18n("views.series.series_count_after") }}
      </span>
    </div>

    <!-- Series List -->
    <div class="series-list">
      <div
        v-for="(series, index) in theme.seriesData"
        :key="series.id"
        class="series-item s-card"
        :style="{ animationDelay: `${0.2 + index / 10}s` }"
      >
        <!-- Series Header -->
        <div class="series-header" @click="toggleSeries(series.id)">
          <div class="series-info">
            <div v-if="series.cover" class="series-cover">
              <img :src="series.cover" :alt="getLocalizedSeriesTitle(series)" />
            </div>
            <div v-else-if="series.icon" class="series-icon">
              <i :class="['font-awesome', series.icon]" />
            </div>
            <div v-else class="series-icon">
              <i class="font-awesome fa-solid fa-book" />
            </div>
            <div class="series-meta">
              <h2 class="series-title">{{ getLocalizedSeriesTitle(series) }}</h2>
              <p v-if="getLocalizedSeriesDescription(series)" class="series-description">
                {{ getLocalizedSeriesDescription(series) }}
              </p>
              <span class="series-count">
                <i class="font-awesome fa-solid fa-file-lines" />
                {{ series.postCount }} {{ i18n("views.series.posts") }}
              </span>
            </div>
          </div>
          <div class="series-toggle">
            <i
              :class="[
                'font-awesome',
                'fa-solid',
                expandedSeries.includes(series.id) ? 'fa-chevron-up' : 'fa-chevron-down',
              ]"
            />
          </div>
        </div>

        <!-- Series Posts (expandable) -->
        <Transition name="expand">
          <div v-show="expandedSeries.includes(series.id)" class="series-posts">
            <div
              v-for="(post, postIndex) in series.posts"
              :key="post.id"
              class="post-item hover"
              @click="router.go(post.regularPath)"
            >
              <span class="post-order">{{ postIndex + 1 }}</span>
              <div class="post-info">
                <span class="post-title">{{ getLocalizedPostTitle(post) }}</span>
                <span v-if="getLocalizedPostDescription(post)" class="post-description">
                  {{ getLocalizedPostDescription(post) }}
                </span>
              </div>
              <span class="post-date">{{ formatTimestamp(post.date) }}</span>
            </div>
            <div v-if="series.posts.length === 0" class="no-posts">
              {{ i18n("views.series.no_posts") }}
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!theme.seriesData || theme.seriesData.length === 0" class="empty-state s-card">
      <i class="font-awesome fa-solid fa-book-open" />
      <p>{{ i18n("views.series.no_series") }}</p>
    </div>
  </div>
</template>

<script setup>
import { formatTimestamp } from "@/utils/helper";
import { useI18n } from "@/utils/i18n";

const { i18n, currentLang } = useI18n();
const { theme } = useData();
const router = useRouter();

// Track which series are expanded
const expandedSeries = ref([]);

// Toggle series expansion
const toggleSeries = (seriesId) => {
  const index = expandedSeries.value.indexOf(seriesId);
  if (index === -1) {
    expandedSeries.value.push(seriesId);
  } else {
    expandedSeries.value.splice(index, 1);
  }
};

// Get localized title for a series
const getLocalizedSeriesTitle = (series) => {
  if (series.localizedTitle && series.localizedTitle[currentLang.value]) {
    return series.localizedTitle[currentLang.value];
  }
  return series.title;
};

// Get localized description for a series
const getLocalizedSeriesDescription = (series) => {
  if (series.localizedDescription && series.localizedDescription[currentLang.value]) {
    return series.localizedDescription[currentLang.value];
  }
  return series.description;
};

// Get localized title for a post
const getLocalizedPostTitle = (post) => {
  if (post.localizedTitle && post.localizedTitle[currentLang.value]) {
    return post.localizedTitle[currentLang.value];
  }
  return post.title;
};

// Get localized description for a post
const getLocalizedPostDescription = (post) => {
  if (post.localizedDescription && post.localizedDescription[currentLang.value]) {
    return post.localizedDescription[currentLang.value];
  }
  return post.description;
};

// Expand all series by default on mount
onMounted(() => {
  if (theme.value.seriesData && theme.value.seriesData.length > 0) {
    // Optionally expand the first series by default
    expandedSeries.value = [theme.value.seriesData[0].id];
  }
});
</script>

<style lang="scss" scoped>
.series-page {
  width: 100%;
  animation: fade-up 0.6s 0.1s backwards;

  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    .title-name {
      font-size: 1.875rem;
      margin-bottom: 0;
    }

    .title-num {
      margin-top: 20px;
      font-size: 1.125rem;
      opacity: 0.6;
    }
  }

  .series-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .series-item {
      padding: 0;
      overflow: hidden;
      animation: fade-up 0.6s backwards;

      .series-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: var(--main-card-second-background);
        }

        .series-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          flex: 1;

          .series-cover {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .series-icon {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background-color: var(--main-color-bg);
            flex-shrink: 0;

            .font-awesome {
              font-size: 1.5rem;
              color: var(--main-color);
            }
          }

          .series-meta {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .series-title {
              font-size: 1.25rem;
              font-weight: bold;
              margin: 0;
              transition: color 0.3s;
            }

            .series-description {
              font-size: 0.9rem;
              opacity: 0.7;
              margin: 0;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .series-count {
              font-size: 0.85rem;
              opacity: 0.6;
              display: flex;
              align-items: center;
              gap: 0.5rem;

              .font-awesome {
                font-size: 0.85rem;
              }
            }
          }
        }

        .series-toggle {
          padding: 0.5rem;
          opacity: 0.6;
          transition: transform 0.3s;

          .font-awesome {
            font-size: 1rem;
          }
        }

        &:hover {
          .series-meta .series-title {
            color: var(--main-color);
          }
        }
      }

      .series-posts {
        border-top: 1px solid var(--main-card-border);
        padding: 0.5rem 0;

        .post-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: var(--main-card-second-background);

            .post-title {
              color: var(--main-color);
            }
          }

          .post-order {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background-color: var(--main-card-border);
            font-size: 0.85rem;
            font-weight: bold;
            flex-shrink: 0;
          }

          .post-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;

            .post-title {
              font-size: 1rem;
              font-weight: 500;
              transition: color 0.3s;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .post-description {
              font-size: 0.85rem;
              opacity: 0.6;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .post-date {
            font-size: 0.85rem;
            opacity: 0.5;
            flex-shrink: 0;
          }
        }

        .no-posts {
          padding: 2rem;
          text-align: center;
          opacity: 0.6;
        }
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;

    .font-awesome {
      font-size: 3rem;
      opacity: 0.3;
      margin-bottom: 1rem;
    }

    p {
      opacity: 0.6;
      margin: 0;
    }
  }
}

// Expand transition
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

@media (max-width: 768px) {
  .series-page {
    .series-list {
      .series-item {
        .series-header {
          padding: 1rem;

          .series-info {
            .series-cover {
              width: 60px;
              height: 60px;
            }

            .series-icon {
              width: 50px;
              height: 50px;

              .font-awesome {
                font-size: 1.25rem;
              }
            }

            .series-meta {
              .series-title {
                font-size: 1.1rem;
              }

              .series-description {
                font-size: 0.85rem;
                -webkit-line-clamp: 1;
                line-clamp: 1;
              }
            }
          }
        }

        .series-posts {
          .post-item {
            padding: 0.75rem 1rem;

            .post-date {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
