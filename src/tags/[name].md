---
title: Tags
localizedTitle:
  zh-CN: 标签
aside: false
padding: false
---

<script setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import Home from "@/views/Home.vue"
import { useI18n } from '@/utils/i18n'

const { currentLang } = useI18n()
const { params, site } = useData();

onMounted(() => {
    if (currentLang.value === 'zh-CN') {
        document.title = `标签: ${params.value.name} | ${site.value.title}`;
    } else {
        document.title = `Tag: ${params.value.name} | ${site.value.title}`;
    }
});
</script>

<Home :showHeader="false" :showTags="params.name" />