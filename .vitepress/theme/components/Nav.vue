<template>
  <header class="main-header">
    <nav :class="['main-nav', scrollData.direction, { top: scrollData.height === 0 }]">
      <div class="nav-all">
        <!-- Left Side Navbar -->
        <div class="left-nav">
          <div class="more-menu nav-btn">
            <i class="font-awesome fa-solid fa-compass"></i>
            <div class="more-card s-card">
              <div v-for="(item, index) in navMore" :key="index" class="more-item">
                <span class="more-name">{{ item.name }}</span>
                <div class="more-list">
                  <a
                    v-for="(link, i) in item.list"
                    :key="i"
                    :href="link.url"
                    class="more-link"
                    target="_blank"
                  >
                    <img class="link-icon" :src="link.icon" :alt="link.name" />
                    <span class="link-name">{{ link.name }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="site-name" @click="router.go('/')">
            {{ getLocalizedSiteTitle() }}
          </div>
        </div>
        <!-- Nav Menu -->
        <div class="nav-center">
          <div class="site-menu">
            <div v-for="(item, index) in navMenu" :key="index" class="menu-item">
              <div v-if="item.items">
                <span class="link-btn" v-if="item.items">{{ item.text }}</span>
                <div class="link-child">
                  <span
                    v-for="(child, childIndex) in item.items"
                    :key="childIndex"
                    class="link-child-btn"
                    @click="router.go(child.link)"
                  >
                    <i v-if="child.icon" :class="`font-awesome ${child.icon}`" />
                    {{ child.text }}
                  </span>
                </div>
              </div>
              <div v-else>
                <span
                  class="link-btn-goto"
                  @click="router.go(item.link)"
                >
                  <i v-if="item.icon" :class="`font-awesome ${item.icon}`" />
                  {{ item.text }}
                </span>
              </div>
            </div>
          </div>
          <span class="site-title" @click="smoothScrolling">
            {{ (frontmatter.value && frontmatter.value.home ? getLocalizedSiteDescription() : pageTitle) || getLocalizedSiteDescription() }}
          </span>
        </div>
        <div class="right-nav">
          <!-- 开往 -->
          <!--
            <a
              class="menu-btn nav-btn travellings"
              title="开往-友链接力"
              href="https://www.travellings.cn/go.html"
              target="_blank"
            >
              <i class="font-awesome fa-solid fa-train-subway"></i>
            </a>
          -->
          <!-- Random Post -->
          <div
            class="menu-btn nav-btn"
            :title="i18n('components.nav.random-post')"
            @click="router.go(shufflePost(theme.postData))"
          >
            <i class="font-awesome fa-solid fa-shuffle"></i>
          </div>
          <!-- Search -->
          <div
            v-if="theme.search.enable"
            class="menu-btn nav-btn"
            :title="i18n('components.nav.search')"
            @click="store.changeShowStatus('searchShow')"
          >
            <i class="font-awesome fa-solid fa-magnifying-glass"></i>
          </div>
          <!-- Control Panel -->
          <div
            id="open-control"
            class="menu-btn nav-btn pc"
            :title="i18n('components.nav.open-control')"
            @click="store.changeShowStatus('controlShow')"
          >
            <i class="font-awesome fa-solid fa-terminal" />
          </div>
          <!-- Go Back to Top -->
          <div
            :class="[
              'to-top',
              'menu-btn',
              { hidden: scrollData.height === 0, long: scrollData.percentage > 90 },
            ]"
            :title="i18n('components.nav.go-back-to-top')"
            @click="smoothScrolling"
          >
            <div class="to-top-btn">
              <Transition name="fade" mode="out-in">
                <span :key="scrollData.percentage > 90" class="num">
                  {{ scrollData.percentage <= 90 ? scrollData.percentage : i18n('components.nav.go-back-to-top') }}
                </span>
              </Transition>
              <i class="font-awesome fa-solid fa-angles-up"></i>
            </div>
          </div>
          <!-- Mobile Menu -->
          <div
            class="menu-btn nav-btn mobile"
            :title="i18n('components.nav.open-mobile-menu')"
            @click="store.changeShowStatus('mobileMenuShow')"
          >
            <i class="font-awesome fa-solid fa-bars" />
          </div>
        </div>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <MobileMenu />
    <!-- Search -->
    <ClientOnly>
      <Search v-if="theme.search.enable" />
    </ClientOnly>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { shufflePost, smoothScrolling } from "@/utils/helper";
import { useI18n } from '@/utils/i18n'

const { i18n, navMenu, navMore, currentLang, getLocalizedSiteTitle, getLocalizedSiteDescription } = useI18n()
const router = useRouter();
const store = mainStore();
const { scrollData } = storeToRefs(store);
const { site, theme, frontmatter, page } = useData();

// Get localized title for display in the nav
const pageTitle = computed(() => {
  if (frontmatter.value && frontmatter.value.localizedTitle &&
      frontmatter.value.localizedTitle[currentLang.value]) {
    return frontmatter.value.localizedTitle[currentLang.value];
  }
  return page.value.title;
});

// Set CSS custom property for back to top text
document.documentElement.style.setProperty('--back-to-top-text', `"${i18n('components.nav.go-back-to-top')}"`);
</script>

<style lang="scss" scoped>
.main-header {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  z-index: 1000;
  animation: show 0.3s backwards;

  .active {
    background: var(--main-color);
  }

  .main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    background-color: var(--main-card-background);
    transition:
      background-color 0.3s,
      backdrop-filter 0.3s;

    &::after {
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: var(--main-card-border);
      transition: opacity 0.3s;
    }

    &.top {
      background-color: transparent;
      outline: 0px;

      &::after {
        opacity: 0;
      }
    }

    &.top,
    &.up {
      .nav-all {
        .site-menu {
          transform: translateY(0);
          opacity: 1;
        }

        .site-title {
          transform: translateY(50px);
          opacity: 0;
        }
      }

      @media (max-width: 768px) {
        .nav-center {
          top: -80px;
        }
      }
    }
  }

  .nav-all {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1400px;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: minmax(200px, 1fr) auto minmax(200px, 1fr);
    align-items: center;

    .left-nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 200px;

      .more-menu {
        position: relative;
        margin-right: 4px;
        @media (max-width: 512px) {
          display: none;
        }

        .more-card {
          position: absolute;
          left: 0;
          top: 46px;
          opacity: 0;
          visibility: hidden;
          transform-origin: left top;
          transform: scale(0.8) translateY(-5px);

          .more-item {
            margin-top: 0.8rem;

            &:first-child {
              margin-top: 0;
            }

            .more-name {
              font-size: 14px;
              display: inline-block;
              color: var(--main-font-second-color);
              margin-bottom: 0.6rem;
            }

            .more-list {
              display: grid;
              gap: 0.8rem;
              grid-template-columns: 1fr 1fr;

              .more-link {
                display: flex;
                align-items: center;
                width: 150px;
                padding: 6px 8px;
                border-radius: 8px;

                .link-icon {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  margin-right: 8px;
                }

                &:hover {
                  color: var(--main-card-background);
                  background-color: var(--main-color);
                }
              }
            }
          }

          &::after {
            content: "";
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            height: 30px;
            z-index: 1;
          }

          &:hover {
            border-color: var(--main-color);
          }
        }

        &:hover {
          .more-card {
            opacity: 1;
            transform: scale(1) translateY(0);
            visibility: visible;
          }
        }
      }

      .site-name {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        height: 34px;
        padding: 0 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: transform 0.3s;
        cursor: pointer;

        &::after {
          content: "\f015";
          font-family: "Font Awesome 6 Free";
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: var(--main-card-background);
          background-color: var(--main-color);
          font-size: 18px;
          border-radius: 25px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        @media (min-width: 768px) {
          &:hover {
            &::after {
              opacity: 1;
            }
          }
          &:active {
            transform: scale(0.95);
          }
        }
      }
    }

    .nav-center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      width: 100%;
      height: 60px;
      overflow: hidden;
      transition: top 0.3s;

      .site-menu {
        position: absolute;
        width: fit-content;
        min-height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 10;
        opacity: 0;
        transform: translateY(-50px);
        transition:
          transform 0.3s,
          opacity 0.3s;

        .menu-item {
          position: relative;
          padding: 0 0.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;
          cursor: pointer;

          .link-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.2rem;
            padding: 0 0.8rem 0 1rem;
            font-weight: bold;
            height: 35px;
            line-height: 35px;
            border-radius: 50px;
            transition:
              color 0.3s,
              background-color 0.3s;
          }

          .link-btn-goto {
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.2rem;
            padding: 0 0.8rem 0 1rem;
            font-weight: bold;
            height: 35px;
            line-height: 35px;
            border-radius: 50px;
            transition:
              color 0.3s,
              background-color 0.3s;

            .font-awesome {
              margin-right: 8px;
              font-size: 20px;
              transition: color 0.3s;
            }
          }

          .link-child {
            position: absolute;
            top: 35px;
            margin-top: 8px;
            padding: 6px 2px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: var(--main-card-background);
            border: 1px solid var(--main-color);
            box-shadow: 0 8px 12px -3px var(--main-color-bg);
            border-radius: 50px;
            transform: translateY(-10px) scale(0.8);
            opacity: 0;
            visibility: hidden;
            transition:
              opacity 0.3s,
              visibility 0.3s,
              transform 0.3s;

            &::before {
              content: "";
              position: absolute;
              top: -14px;
              left: 0;
              width: 100%;
              height: 20px;
            }

            .link-child-btn {
              display: flex;
              align-items: center;
              border-radius: 100px;
              margin: 0 4px;
              padding: 0.6rem 0.8rem;
              white-space: nowrap;
              transition:
                color 0.3s,
                padding 0.3s,
                background-color 0.3s,
                box-shadow 0.3s;

              .font-awesome {
                margin-right: 8px;
                font-size: 20px;
                transition: color 0.3s;
              }

              &:hover {
                color: var(--main-card-background);
                background-color: var(--main-color);
                box-shadow: 0 8px 12px -3px var(--main-color-bg);
                padding: 0.6rem 1rem;

                .font-awesome {
                  color: var(--main-card-background);
                }
              }
            }
          }

          &:first-child {
            .link-child {
              &::after {
                content: "";
                position: absolute;
                top: -60px;
                left: 0;
                width: 50%;
                height: 60px;
              }
            }
          }

          &:last-child {
            .link-child {
              &::after {
                content: "";
                position: absolute;
                top: -60px;
                right: 0;
                width: 50%;
                height: 60px;
              }
            }
          }

          &:hover {
            .link-btn {
              color: var(--main-card-background);
              background-color: var(--main-color);
            }

            .link-btn-goto {
              color: var(--main-card-background);
              background-color: var(--main-color);
            }

            .link-child {
              transform: translateY(0) scale(1);
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }

      .site-title {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 280px;
        height: 35px;
        font-weight: bold;
        font-size: 18px;
        padding: 4px 8px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition:
          transform 0.3s,
          opacity 0.3s;
        cursor: pointer;

        &::after {
          content: var(--back-to-top-text, "Back to Top");
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 35px;
          font-size: 16px;
          border-radius: 50px;
          color: var(--main-card-background);
          background-color: var(--main-color);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 1;
        }

        &:hover {
          &::after {
            opacity: 1;
          }
        }

        &:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          &::after {
            display: none;
          }
        }
      }
    }

    .right-nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      min-width: 200px;

      .menu-btn {
        margin-left: 0.5rem;

        &.mobile {
          display: none;
        }

        @media (max-width: 768px) {
          &.mobile {
            display: flex;
          }
          &.pc {
            display: none;
          }
        }
      }

      .to-top {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        transition: all 0.3s;
        cursor: pointer;

        .to-top-btn {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 40px;
          background-color: var(--main-font-color);
          transition:
            width 0.3s,
            height 0.3s,
            background-color 0.3s;

          .num {
            position: absolute;
            font-size: 12px;
            color: var(--main-card-background);
            transition: opacity 0.1s;
          }

          .icon-up {
            position: absolute;
            color: var(--main-card-background);
            opacity: 0;
            transition: opacity 0.3s;
          }
        }

        &.hidden {
          width: 0;
          opacity: 0;
          transform: scale(0);
          margin: 0;
        }

        &.long {
          width: 80px;

          .to-top-btn {
            width: 70px;
          }
        }

        &:hover {
          .to-top-btn {
            width: 35px;
            height: 35px;
            background-color: var(--main-color);

            .num {
              opacity: 0;
            }

            .icon-up {
              opacity: 1;
            }
          }

          &.long {
            width: 80px;

            .to-top-btn {
              width: 80px;
              height: 35px;
            }
          }
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      .left-nav,
      .right-nav {
        min-width: auto;
      }
      .nav-center {
        // display: none;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--main-card-background);
        border-bottom: 1px solid var(--main-card-border);
        z-index: 100;

        .site-title {
          font-size: 15px;
          height: auto;
        }
      }
    }
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    transition: background-color 0.3s;
    border-radius: 50%;
    cursor: pointer;

    .font-awesome {
      font-size: 20px;
      line-height: 1;
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
}
</style>
