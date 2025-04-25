<!-- Friendly Links & Recommended Sites -->
<template>
  <div class="link">
    <Banner type="page" title="Friendly Links & Recommended Sites" desc="They are all great! Check them out!">
      <template v-slot:header-slot>
        <div class="menu">
          <div class="menu-item random" @click="randomJump">
            <i class="font-awesome fa-solid fa-shuffle" />
            <span class="name">{{ i18n('views.links.shuffle') }}</span>
          </div>
          <div class="menu-item add" @click="smoothScrolling('#apply')">
            <i class="font-awesome fa-solid fa-circle-chevron-right" />
            <span class="name">{{ i18n('views.links.apply') }}</span>
          </div>
        </div>
      </template>
      <!-- <div class="link-group">
        <div v-for="(link, index) in pairedLinks(allLinkData)" :key="index" class="link-group-item">
          <a v-for="(item, i) in link" :key="i" :href="item.url" class="link-logo">
            <LazyLoader>
              <img
                :src="item.avatar"
                :alt="item.name"
                class="link-logo-img"
                @load="(e) => e.target.classList.add('loaded')"
              />
            </LazyLoader>
          </a>
        </div>
      </div> -->
    </Banner>
    <!-- Link Data -->
    <LinkList :listData="linkData" :useFriendsLink="true" />
  </div>
</template>

<script setup>
import { smoothScrolling } from "@/utils/helper";
import linkData from "@/assets/linkData.mjs";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()

const allLinkData = computed(() => {
  return linkData.flatMap((item) => item.typeList);
});

const randomJump = () => {
  try {
    const friendList = allLinkData.value;
    const randomList = friendList[Math.floor(Math.random() * friendList.length)];
    if (randomList?.url) window.open(randomList.url, "_blank");
  } catch (error) {
    console.error("Error Accessing Friendly Link: ", error);
    $message.error("Error Accessing Friendly Link. Please try again.");
  }
};
</script>

<style lang="scss" scoped>
.link {
  margin-bottom: 4rem;
  .banner-page {
    // min-height: 440px;
    min-height: auto;
    .menu {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-start;
      margin-bottom: auto;
      .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 46px;
        padding: 12px 18px;
        border-radius: 8px;
        background-color: var(--main-card-second-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        transition: all 0.3s;
        cursor: pointer;
        .font-awesome {
          font-size: 18px;
          margin-right: 8px;
          transition: color 0.3s;
        }
        &.random {
          color: var(--main-color);
          .font-awesome {
            color: var(--main-color);
          }
        }
        &.add {
          color: var(--main-card-second-background);
          background-color: var(--main-font-color);
          .font-awesome {
            font-size: 22px;
            margin-right: 6px;
            color: var(--main-card-second-background);
          }
        }
        &:last-child {
          margin-left: 20px;
        }
        &:hover {
          color: #fff;
          background-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-color-bg);
          .font-awesome {
            color: #fff;
          }
        }
      }
    }
    .link-group {
      position: absolute;
      left: 0;
      top: 140px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: hidden;
      .link-group-item {
        display: flex;
        flex-direction: column;
        .link-logo {
          margin-right: 1.2rem;
          .link-logo-img {
            width: 120px;
            height: 120px;
            min-width: 120px;
            border-radius: 50%;
            overflow: hidden;
          }
          &:nth-of-type(2n) {
            margin-top: 1.2rem;
            transform: translate(-60px);
          }
        }
      }
    }
    @media (max-width: 800px) {
      min-height: auto;
      .menu,
      .link-group {
        display: none;
      }
    }
  }
}
</style>
