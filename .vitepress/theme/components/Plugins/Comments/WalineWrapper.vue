<template>
  <div ref="commentRef" id="comment-dom" :class="['comment-content', 'waline', { fill }]">
    <Waline
      :serverURL="serverURL"
      :path="path"
      :lang="lang"
      :emoji="emoji"
      :dark="dark"
      :meta="meta"
      :requiredMeta="requiredMeta"
      :login="login"
      :pageSize="pageSize"
      :reaction="reaction"
    />
  </div>
</template>

<script setup>
import { Waline } from '@waline/client/component';
import { pageviewCount, commentCount } from '@waline/client';
import { computed } from 'vue';

import '@waline/client/style';

import { mainStore } from "@/store";
import { useI18n } from '@/utils/i18n';

const route = useRoute();
const props = defineProps({
  fill: {
    type: [Boolean, String],
    default: false,
  },
});

const { theme } = useData();
const { comment } = theme.value;
const store = mainStore()
const { currentLang } = useI18n();

const serverURL = computed(() => comment.waline.serverURL);
const path = computed(() => route.path);
const lang = computed(() => {
  return currentLang.value === 'zh-CN' ? 'zh-CN' : 'en-US';
});
const emoji = computed(() => comment.waline.emoji || []);
const dark = computed(() => {
  if (store.themeType === 'auto') {
    return 'auto';
  }
  return store.themeType === 'dark';
});
const meta = computed(() => comment.waline.meta || []);
const requiredMeta = computed(() => comment.waline.requiredMeta || []);
const login = computed(() => comment.waline.login || 'enable');
const pageSize = computed(() => comment.waline.pageSize || 10);
const reaction = computed(() => comment.waline.reaction || false);

onMounted (() => {
  pageviewCount({
    serverURL: comment.waline.serverURL,
    path: route.path,
  });
  commentCount({
    serverURL: comment.waline.serverURL,
    path: route.path,
  });
});
</script>

<style lang="scss">
</style>
