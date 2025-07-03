<template>
  <strong style="color: var(--main-color)">{{ i18n('components.footer-reference-title') }}</strong>
</template>

<script setup>
import { useI18n } from "@/utils/i18n";
const { i18n } = useI18n();
</script>
