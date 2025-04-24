<!-- Sidebar - Site Data -->
<template>
  <div class="site-data s-card">
    <div class="title">
      <i class="font-awesome fa-solid fa-chart-bar"></i>
      <span class="title-name">{{ i18n('components.aside.widgets.site-data.site-data') }}</span>
    </div>
    <div class="all-data">
      <div class="data-item">
        <span class="name">
          <i class="font-awesome fa-solid fa-newspaper"></i>
          {{ i18n('components.aside.widgets.site-data.post-count') }}
        </span>
        <span class="num">{{ theme.postData?.length || 0 }} {{ i18n('components.aside.widgets.site-data.posts') }}</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="font-awesome fa-solid fa-calendar-days"></i>
          {{ i18n('components.aside.widgets.site-data.online-since') }}
        </span>
        <span class="num">{{ daysFromNow(theme.since) }} {{ i18n('components.aside.widgets.site-data.days') }}</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="font-awesome fa-solid fa-eye"></i>
          {{ i18n('components.aside.widgets.site-data.visit-count') }}
        </span>
        <span>
          <span class="num" id="busuanzi_value_site_pv">0</span>
          <span class="num">{{ i18n('components.aside.widgets.site-data.times') }}</span>
        </span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="font-awesome fa-solid fa-users"></i>
          {{ i18n('components.aside.widgets.site-data.visitor-count') }}
        </span>
        <span>
          <span class="num" id="busuanzi_value_site_uv">0</span>
          <span class="num">{{ i18n('components.aside.widgets.site-data.visitors') }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loadScript } from "@/utils/commonTools";
import { daysFromNow } from "@/utils/helper";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const { theme } = useData();

onMounted(() => {
  loadScript("https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js", {
    async: true,
    reload: true,
  });
});
</script>

<style lang="scss" scoped>
.site-data {
  .all-data {
    .data-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.2rem;
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        .font-awesome {
          margin-right: 8px;
          opacity: 0.6;
          font-size: 18px;
        }
      }
      .num {
        opacity: 0.8;
        font-size: 15px;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
