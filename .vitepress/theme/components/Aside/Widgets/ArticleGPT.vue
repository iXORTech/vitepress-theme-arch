<!-- AI Article Summary (A Fake One) -->
<template>
  <div v-if="theme.fakeGPT && frontmatter.articleGPT" class="article-gpt s-card">
    <div class="title">
      <span class="name">
        <i class="font-awesome fa-solid fa-robot"></i>
        {{ i18n('components.aside.widgets.articleGPT.summary') }}
        <i class="fa-solid fa-angle-right"></i>
      </span>
      <span :class="['logo', { loading }]" @click="showOther"> FakeGPT </span>
    </div>
    <div class="content s-card">
      <span class="text">{{ abstractData === "" ? i18n('components.aside.widgets.articleGPT.loading') : abstractData }}</span>
      <span v-if="loading" class="point">|</span>
    </div>
    <div class="meta">
      <span class="tip">{{ i18n('components.aside.widgets.articleGPT.meta') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const { theme } = useData();
const { frontmatter } = useData();

const loading = ref(true);
const waitTimeOut = ref(null);
const abstractData = ref("");
const showIndex = ref(0);
const showType = ref(false);

const typeWriter = (text = null) => {
  try {
    const data = text || frontmatter.value.articleGPT;
    if (!data) return false;
    if (showIndex.value < data.length) {
      abstractData.value += data.charAt(showIndex.value++);
      const delay = Math.random() * (150 - 30) + 30;
      setTimeout(() => {
        typeWriter(text);
      }, delay);
    } else {
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    abstractData.value = "Summary generation failed.";
    $message.error("Summary generation failed, please try again.");
    console.error("Summary generation failed: ", error);
  }
};

const initAbstract = () => {
  waitTimeOut.value = setTimeout(
    () => {
      typeWriter();
    },
    Math.random() * (3800 - 2500) + 2500,
  );
};

const showOther = () => {
  if (loading.value) return false;
  const text = i18n('components.aside.widgets.articleGPT.info');
  showIndex.value = 0;
  loading.value = true;
  abstractData.value = "";
  if (!showType.value) {
    showType.value = true;
    typeWriter(text);
  } else {
    typeWriter();
    showType.value = false;
  }
};

onMounted(() => {
  if (frontmatter.value.articleGPT) initAbstract();
});

onBeforeUnmount(() => {
  clearTimeout(waitTimeOut.value);
});
</script>

<style lang="scss" scoped>
.article-gpt {
  margin-top: 1.2rem;
  background-color: var(--main-card-second-background);
  user-select: none;
  cursor: auto;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding: 0 8px;
    .name {
      display: flex;
      align-items: center;
      color: var(--main-color);
      font-weight: bold;
      cursor: pointer;
      .fa-robot {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        width: 26px;
        height: 26px;
        color: var(--main-card-background);
        background-color: var(--main-color);
        border-radius: 50%;
        margin-right: 8px;
      }
      .fa-angle-right {
        font-size: 12px;
        margin-left: 6px;
        opacity: 0.6;
        color: var(--main-color);
      }
    }
    .logo {
      padding: 4px 10px;
      font-size: 12px;
      color: var(--main-card-background);
      background-color: var(--main-color);
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      &.loading {
        animation: loading 1s infinite;
        cursor: not-allowed;
      }
    }
  }
  .content {
    cursor: auto;
    .point {
      color: var(--main-color);
      font-weight: bold;
      margin-left: 4px;
      animation: loading 0.8s infinite;
    }
  }
  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 8px;
    font-size: 12px;

    .tip {
      opacity: 0.6;
    }
    .report {
      white-space: nowrap;
      margin-left: 12px;
      opacity: 0.8;
    }
  }
}
</style>
