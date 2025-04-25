<!-- 链接卡片 -->
<template>
  <a :href="url" :target="isOutLink ? '_blank' : null" class="link-card s-card hover">
    <span v-if="isOutLink" class="link-tip">
      {{ i18n('components.tags.link-card.tip') }}
    </span>
    <div class="link-data">
      <div class="link-icon">
        <img v-if="icon" class="link-img" :src="icon" alt="link-img" />
        <img
          v-else-if="siteInfo?.iconUrl"
          :src="siteInfo.iconUrl"
          class="link-img"
          alt="link-img"
          @error="siteInfo.iconUrl = null"
        />
        <i v-else class="font-awesome fa-solid fa-link"></i>
      </div>
      <div class="link-desc">
        <!-- Title -->
        <span v-if="title" class="link-title">{{ title }}</span>
        <span v-else class="link-title">{{ siteInfo?.title || i18n('components.tags.link-card.no-title') }}</span>
        <!-- Description -->
        <span v-if="desc" class="link-description">{{ desc }}</span>
        <span v-else class="link-description">{{ siteInfo?.description || i18n('components.tags.link-card.no-description') }}</span>
      </div>
      <i class="link-go font-awesome fa-solid fa-angle-up"></i>
    </div>
  </a>
</template>

<script setup>
import { getSiteInfo } from "@/api";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

const siteInfo = ref(null);

const isOutLink = computed(() => {
  const link = props.url;
  if (!link) return false;
  return !link.startsWith("/") && (link.startsWith("http://") || link.startsWith("https://"));
});

const getSiteInfoData = async () => {
  const url = props.url;
  if (!url) return false;
  if (props.title || props.desc || props.icon) return false;
  const result = await getSiteInfo(url);
  siteInfo.value = result;
};

onMounted(() => {
  getSiteInfoData();
});
</script>

<style lang="scss" scoped>
.link-card {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--main-card-second-background);
  .link-tip {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    opacity: 0.6;
    padding-bottom: 0.8rem;
    margin-bottom: 0.8rem;
    border-bottom: 2px dashed var(--main-card-border);
  }
  .link-data {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .link-icon {
      width: 60px;
      height: 60px;
      min-width: 60px;
      margin-right: 0.8rem;
      border-radius: 12px;
      overflow: hidden;
      .link-img {
        width: 100%;
        height: 100%;
      }
      .font-awesome {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        background-color: var(--main-card-border);
      }
    }
    .link-desc {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .link-title {
        margin-bottom: 4px;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow-wrap: break-word;
      }
      .link-description {
        color: var(--main-font-second-color);
        font-size: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        transition: color 0.3s;
      }
    }
    .link-go {
      display: flex;
      margin-left: 12px;
      transform: rotate(90deg);
      transition: color 0.3s;
    }
  }
  &:hover {
    color: var(--main-card-background);
    background-color: var(--main-color);
    .link-data {
      .link-desc {
        .link-description {
          color: var(--main-card-background);
          opacity: 0.6;
        }
      }
      .link-go {
        color: var(--main-card-background);
      }
    }
  }
}
</style>
