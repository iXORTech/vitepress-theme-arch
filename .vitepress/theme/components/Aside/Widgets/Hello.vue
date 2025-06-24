<!-- Sidebar - Clock & Welcoming -->
<template>
  <div class="hello s-card" @mouseleave="resetHello">
    <span class="tip" @click="changeHello">{{ helloText }}</span>
    <div class="content">
      <div class="site-logo">
        <Clock />
      </div>
      <span class="site-desc" v-html="siteDesc" />
    </div>
    <div class="info">
      <div class="name">
        <span class="author">{{ theme.siteMeta.author.name }}</span>
        <span class="desc">{{ description }}</span>
      </div>
      <div class="link">
        <a href="https://github.com/" target="_blank" class="social-link">
          <i class="font-awesome fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/" target="_blank" class="social-link">
          <i class="font-awesome fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getGreetings } from "@/utils/helper";
import { useI18n } from '@/utils/i18n'

const { i18n, currentLang } = useI18n()
const { site, theme } = useData();

// 多语言 site-desc
const siteDesc = computed(() => {
  // 优先 theme.aside.hello.localizedText
  if (theme.value.aside?.hello?.localizedText && theme.value.aside.hello.localizedText[currentLang.value]) {
    return theme.value.aside.hello.localizedText[currentLang.value]
  }
  // 兼容旧配置
  return theme.value.aside.hello.text
})

const description = computed(() => {
  // 优先 theme.siteMeta.locolizedDescription
  if (theme.value.siteMeta?.localizedDescription && theme.value.siteMeta.localizedDescription[currentLang.value]) {
    return theme.value.siteMeta.localizedDescription[currentLang.value]
  }
  // 兼容旧配置
  return theme.value.siteMeta.description
});

// Welcome Message Data (yes, Easter Egg!)
const helloClick = ref(0);
const helloTimeOut = ref(null);
const helloText = ref(i18n(getGreetings()));

// Restore Welcome Message
const resetHello = () => {
  helloClick.value = 0;
  if (isHasUser()) return false;
  helloText.value = i18n(getGreetings());
};

// Change Welcome Message
const changeHello = () => {
  clearTimeout(helloTimeOut.value);
  helloClick.value++;
  if (helloClick.value === 1) {
    helloText.value = i18n('components.aside.widgets.hello.text.one');
  } else if (helloClick.value === 2) {
    helloText.value = i18n('components.aside.widgets.hello.text.two');
  } else if (helloClick.value === 3) {
    helloText.value = i18n('components.aside.widgets.hello.text.three');
  } else if (helloClick.value === 100 + 3) {
    // +3 for the first three clicks
    helloText.value = i18n('components.aside.widgets.hello.text.hundred');
  } else {
    helloText.value = `x ${helloClick.value - 3}`;
  }
  // Restore after 3 seconds
  helloTimeOut.value = setTimeout(() => {
    resetHello();
  }, 3000);
};

const isHasUser = () => {
  const userData = localStorage.getItem("ArtalkUser");
  if (!userData) return false;
  const { nick } = JSON.parse(userData);
  const hello = [
    i18n('components.aside.widgets.hello.text.random_1'),
    i18n('components.aside.widgets.hello.text.random_2'),
    i18n('components.aside.widgets.hello.text.random_3'),
  ];
  helloText.value = hello[Math.floor(Math.random() * hello.length)] + "，" + nick;
  return true;
};

onMounted(() => {
  isHasUser();
});

onBeforeUnmount(() => {
  clearTimeout(helloTimeOut.value);
});
</script>

<style lang="scss" scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-color);
  color: var(--main-card-background);
  border: none;
  .tip {
    display: inline-block;
    min-width: 140px;
    text-align: center;
    padding: 6px 12px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: bold;
    background-color: var(--main-color-opacity);
    margin-bottom: 12px;
    transition:
      color 0.3s,
      transform 0.3s,
      background-color 0.3s;
    &:hover {
      transform: scale(1.1);
      color: var(--main-font-color);
      background-color: var(--main-card-background);
    }
    &:active {
      transform: scale(1);
    }
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 180px;
    .site-logo {
      position: absolute;
      width: 160px;
      height: 160px;
      transition:
        transform cubic-bezier(0.69, 0.39, 0, 1.21) 0.3s,
        opacity cubic-bezier(0.69, 0.39, 0, 1.21) 0.3s;
      transform-origin: bottom;
    }
    .site-desc {
      display: block;
      height: 100%;
      margin-top: 20px;
      font-size: 1.1rem;
      line-height: 1.5;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    .name {
      display: flex;
      flex-direction: column;
      .author {
        font-weight: bold;
        font-size: 20px;
      }
      .desc {
        font-size: 12px;
        opacity: 0.6;
      }
    }
    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 20px;
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-left: 12px;
        background-color: var(--main-color-opacity);
        border-radius: 50%;
        .font-awesome {
          font-size: 22px;
          color: var(--main-card-background);
        }
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          transform: scale(1.1);
          background-color: var(--main-card-background);
          .font-awesome {
            color: var(--main-font-color);
          }
        }
      }
    }
  }
  &:hover {
    .content {
      .site-logo {
        opacity: 0;
        transform: scale(0);
      }
      .site-desc {
        opacity: 1;
      }
    }
  }
}
</style>
