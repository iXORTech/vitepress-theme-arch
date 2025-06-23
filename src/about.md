---
title: About Us
aside: false
---

<script setup>
import About from "@/views/About.vue"
import { watchEffect } from 'vue'
import { useI18n } from '@/utils/i18n'

const { currentLang } = useI18n()

watchEffect(() => {
  document.title = currentLang.value === 'zh-CN'
    ? '关于本站 | VitePress Theme Arch'
    : 'About Us | VitePress Theme Arch'
})
</script>

<About />
