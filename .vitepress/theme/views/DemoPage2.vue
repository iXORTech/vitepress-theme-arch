<template>
  <div class="message-box">
    <p class="message">Hello, {{ world }}!</p>
  </div>
</template>

<script setup>
const world = "Vue Component";
</script>

<style lang="scss" scoped>
.message-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  color: var(--main-color);
  font-style: italic;
}
</style>
