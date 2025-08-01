<template>
  <Teleport to="body">
    <!-- Mobile Menu -->
    <Transition name="fade" mode="out-in">
      <div v-show="store.mobileMenuShow" class="mobile-menu">
        <!-- Background Mask -->
        <div class="menu-mask" @click="store.changeShowStatus('mobileMenuShow')" />
        <Transition name="toLeft" mode="out-in">
          <div v-show="store.mobileMenuShow" class="menu-content s-card">
            <!-- Close Button -->
            <div class="close-control" @click="store.changeShowStatus('mobileMenuShow')">
              <i class="font-awesome fa-solid fa-xmark"></i>
            </div>
            <!-- Menu -->
            <div class="menu-list">
              <div v-for="(item, index) in localizedNav" :key="index" class="menu-item">
                <div v-if="item.items">
                  <span class="link-title">{{ item.text }}</span>
                  <div v-if="item.items" class="link-child">
                    <div
                      v-for="(child, childIndex) in item.items"
                      :key="childIndex"
                      class="link-child-btn"
                      @click="pageJump(child.link)"
                    >
                      <i v-if="child.icon" :class="`font-awesome fa-solid fa-${child.icon}`" />
                      <span class="name">{{ child.text }}</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <span class="link-child-btn-root" @click="pageJump(item.link)">
                    <i v-if="item.icon" :class="`font-awesome fa-solid fa-${item.icon}`" />
                    {{ item.text }}
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <!-- Tags -->
            <div class="tags-list menu-item">
              <span class="link-title">{{ i18n('components.mobile-menu.tags') }}</span>
              <div class="link-child">
                <div
                  v-for="(item, tag, index) in tagsData"
                  :key="index"
                  class="link-child-btn"
                  @click="pageJump(`/tags/${tag}`)"
                >
                  <span class="name">{{ tag }}</span>
                  <sup class="num">{{ item.count }}</sup>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { mainStore } from "@/store";
import { useI18n } from '@/utils/i18n'

const { i18n, currentLang } = useI18n()
const store = mainStore();
const router = useRouter();
const { theme } = useData();
const { tagsData } = theme.value;

// Use localized nav if available, fallback to default nav
const localizedNav = computed(() => {
  const navLocales = theme.value.navLocales;
  const nav = theme.value.nav;
  const lang = currentLang?.value || theme.value.siteMeta?.lang || 'zh-CN';
  return (navLocales && navLocales[lang]) ? navLocales[lang] : nav;
});

const pageJump = (url) => {
  if (!url) return false;
  store.changeShowStatus("mobileMenuShow");
  router.go(url);
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;

  .menu-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }

  .menu-content {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 300px;
    border-radius: 12px 0 0 12px;
    padding: 20px;
    overflow: auto;

    .close-control {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      padding: 0;
      transition:
        background-color 0.3s,
        opacity 0.3s;
      border-radius: 50%;
      cursor: pointer;

      .font-awesome {
        font-size: 18px;
        line-height: 1;
        color: var(--main-font-second-color);
        transition:
          color 0.3s,
          opacity 0.3s;
      }

      &:hover {
        background-color: var(--main-color);

        .font-awesome {
          color: var(--main-card-background);
        }
      }
    }

    .menu-list {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .menu-item {
      margin-bottom: 12px;

      .link-title {
        font-size: 14px;
        margin-bottom: 12px;
        display: inline-block;
        color: var(--main-font-second-color);
      }

      .link-child-btn-root {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-radius: 8px;
        padding: 10px 12px;
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        font-size: 15px;

        .font-awesome {
          margin-right: 6px;
          opacity: 0.6;
        }

        .name {
          max-width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .num {
          opacity: 0.4;
          font-size: 12px;
          margin-bottom: auto;
          margin-left: 4px;
        }
      }

      .link-child {
        display: grid;
        gap: 12px;
        grid-template-columns: 1fr 1fr;

        .link-child-btn {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          border-radius: 8px;
          padding: 10px 12px;
          background-color: var(--main-card-background);
          border: 1px solid var(--main-card-border);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
          font-size: 15px;

          .font-awesome {
            margin-right: 6px;
            opacity: 0.6;
          }

          .name {
            max-width: 80px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .num {
            opacity: 0.4;
            font-size: 12px;
            margin-bottom: auto;
            margin-left: 4px;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    hr {
      margin: 1rem 0;
      opacity: 0.4;
      border: 1px dashed var(--main-font-second-color);
    }
  }
}
</style>
