<template>
  <div v-if="type === 'categories'" class="type-bar s-card hover">
    <div class="all-type">
      <a
        v-if="currentTypeName"
        :href="`/categories/${currentTypeName}`"
        class="type-item choose"
      >
        {{ currentTypeName }}
      </a>
      <a href="/" :class="['type-item', { choose: !currentTypeName }]">{{ i18n('components.list.type-bar.home') }}</a>
      <a
        v-for="(_, key, index) in theme.categoriesData"
        :key="index"
        :href="`/categories/${key}`"
        :class="['type-item', { hidden: currentTypeName === key }]"
      >
        {{ key }}
      </a>
    </div>
    <a href="/categories" class="more-type">
      <i class="font-awesome fa-solid fa-angles-right" />
      {{ i18n('components.list.type-bar.more') }}
    </a>
  </div>
  <div v-else-if="type === 'tags'" class="type-bar s-card hover">
    <div class="all-type">
      <a v-if="currentTypeName" :href="`/tags/${currentTypeName}`" class="type-item choose">
        {{ currentTypeName }}
        <span class="num">{{ theme.tagsData?.[currentTypeName]?.count || 0 }}</span>
      </a>
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/tags/${key}`"
        :class="['type-item', { hidden: currentTypeName === key }]"
      >
        {{ key }}
        <span class="num">{{ item.count }}</span>
      </a>
    </div>
    <a href="/tags" class="more-type">
      <i class="font-awesome fa-solid fa-angles-right" />
      {{ i18n('components.list.type-bar.more') }}
    </a>
  </div>
</template>

<script setup>
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const { theme, params } = useData();
const props = defineProps({
  type: {
    type: String,
    default: "categories",
  },
});

const currentTypeName = computed(() => {
  return params.value?.name || null;
});
</script>

<style lang="scss" scoped>
.type-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.6rem;
  font-weight: bold;
  animation: fade-up 0.6s 0.3s backwards;
  .all-type {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    overflow: hidden;
    mask: linear-gradient(
      90deg,
      #fff 0,
      #fff 90%,
      hsla(0, 0%, 100%, 0.6) 95%,
      hsla(0, 0%, 100%, 0) 100%
    );
    .type-item {
      display: flex;
      align-items: center;
      padding: 0.1rem 0.5rem;
      margin-right: 6px;
      font-weight: bold;
      border-radius: 8px;
      white-space: nowrap;
      height: 30px;
      cursor: pointer;
      .num {
        margin-left: 4px;
        font-weight: normal;
        padding: 2px 6px;
        font-size: 0.75rem;
        color: var(--main-font-color);
        background-color: var(--main-card-border);
        border-radius: 8px;
      }
      &.choose {
        color: var(--main-card-background);
        background-color: var(--main-color);
        .num {
          color: var(--main-color);
        }
      }
      &.hidden {
        display: none;
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
      }
    }
  }
  .more-type {
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    margin-right: 4px;
    margin-left: 8px;
    .font-awesome {
      font-size: 0.9375rem;
      margin-right: 8px;
    }
    &:hover {
      .font-awesome {
        color: var(--main-color);
      }
    }
  }
}
</style>
