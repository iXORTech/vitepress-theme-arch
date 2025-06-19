---
title: Tags
aside: false
padding: false
---

<script setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import Home from "@/views/Home.vue"

const { params, site } = useData();

onMounted(() => {
  document.title = `Tag: ${params.value.name} | ${site.value.title}`;
});
</script>

<Home :showHeader="false" :showTags="params.name" />