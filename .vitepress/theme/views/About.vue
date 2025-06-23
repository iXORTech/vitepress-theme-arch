<template>
  <div v-if="currentLang === 'zh-CN'" class="about">
    <zh-c-n />
  </div>
  <div v-else class="about">
    <en-u-s />
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { useI18n } from '@/utils/i18n';

const { theme } = useData();
const { currentLang } = useI18n();

import zhCN from './about/zh-CN.vue'
import enUS from './about/en-US.vue'
</script>
