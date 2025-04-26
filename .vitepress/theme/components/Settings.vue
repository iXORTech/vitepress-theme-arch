<!-- Global Settings -->
<template>
  <div class="settings">
    <div class="set-btn s-card" @click="store.changeShowStatus('showSeetings')">
      <i class="font-awesome fa-solid fa-sliders"></i>
      <span class="set-text">{{ i18n('components.settings.personalization-settings') }}</span>
    </div>
    <!-- 设置面板 -->
    <Modal
      :show="store.showSeetings"
      :title="i18n('components.settings.personalization-settings')"
      titleIcon="sliders"
      @mask-click="store.changeShowStatus('showSeetings')"
      @modal-close="store.changeShowStatus('showSeetings')"
    >
      <div class="set-list">
        <span class="title">{{ i18n('components.settings.font') }}</span>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.text-font') }}</span>
          <div class="set-options">
            <span
              :class="['options', { choose: fontFamily === 'plex-serif' }]"
              @click="fontFamily = 'plex-serif'"
            >
              IBM Plex Serif
            </span>
            <span
              :class="['options', { choose: fontFamily === 'plex-sans' }]"
              @click="fontFamily = 'plex-sans'"
            >
              IBM Plex Sans
            </span>
          </div>
        </div>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.code-font') }}</span>
          <div class="set-options">
            <span
              :class="['options', { choose: codeFontFamily === 'plex-mono' }]"
              @click="codeFontFamily = 'plex-mono'"
            >
              IBM Plex Mono
            </span>
            <span
              :class="['options', { choose: codeFontFamily === 'monaspace-neon' }]"
              @click="codeFontFamily = 'monaspace-neon'"
            >
              Monaspace Neon
            </span>
            <span
              :class="['options', { choose: codeFontFamily === 'monaspace-argon' }]"
              @click="codeFontFamily = 'monaspace-argon'"
            >
              Monaspace Argon
            </span>
            <span
              :class="['options', { choose: codeFontFamily === 'monaspace-xenon' }]"
              @click="codeFontFamily = 'monaspace-xenon'"
            >
              Monaspace Xenon
            </span>
            <span
              :class="['options', { choose: codeFontFamily === 'monaspace-radon' }]"
              @click="codeFontFamily = 'monaspace-radon'"
            >
              Monaspace Radon
            </span>
            <span
              :class="['options', { choose: codeFontFamily === 'monaspace-krypton' }]"
              @click="codeFontFamily = 'monaspace-krypton'"
            >
              Monaspace Krypton
            </span>
          </div>
        </div>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.font-size') }}</span>
          <div class="set-options">
            <span class="options" @click="store.changeFontSize(false)"> - </span>
            <span class="num">{{ fontSize }}</span>
            <span class="options" @click="store.changeFontSize(true)"> + </span>
          </div>
        </div>
        <span class="title">{{ i18n('components.settings.customize-bg') }}</span>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.site-bg') }}</span>
          <div class="set-options">
            <span
              :class="['options', { choose: backgroundType === 'close' }]"
              @click="backgroundType = 'close'"
            >
              {{ i18n('components.settings.bg-off') }}
            </span>
            <span
              :class="['options', { choose: backgroundType === 'patterns' }]"
              @click="backgroundType = 'patterns'"
            >
              {{ i18n('components.settings.bg-pattern') }}
            </span>
          </div>
        </div>
        <span class="title">{{ i18n('components.settings.home-page-style') }}</span>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.banner-height') }}</span>
          <div class="set-options">
            <span
              :class="['options', { choose: bannerType === 'half' }]"
              @click="bannerType = 'half'"
            >
              {{ i18n('components.settings.banner-half-height') }}
            </span>
            <span
              :class="['options', { choose: bannerType === 'full' }]"
              @click="bannerType = 'full'"
            >
              {{ i18n('components.settings.banner-full-height') }}
            </span>
          </div>
        </div>
        <span class="title">{{ i18n('components.settings.miscellaneous') }}</span>
        <div class="set-item">
          <span class="set-label">{{ i18n('components.settings.extra-info-display-position') }}</span>
          <div class="set-options">
            <span
              :class="['options', { choose: infoPosition === 'normal' }]"
              @click="infoPosition = 'normal'"
            >
              {{ i18n('components.settings.extra-info-default-position') }}
            </span>
            <span
              :class="['options', { choose: infoPosition === 'fixed' }]"
              @click="infoPosition = 'fixed'"
            >
              {{ i18n('components.settings.extra-info-bottom-right-position') }}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const store = mainStore();
const { themeType, fontFamily, codeFontFamily, fontSize, infoPosition, backgroundType, bannerType } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.settings {
  .set-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border-radius: 25px;
    box-shadow: 0 6px 10px -4px var(--main-dark-shadow);
    .font-awesome {
      font-size: 22px;
      margin-left: 10px;
      transition: color 0.3s;
    }
    .set-text {
      margin-left: 10px;
      display: inline-flex;
      opacity: 0;
      font-size: 14px;
      line-height: 1;
      overflow: hidden;
      white-space: nowrap;
      transition: opacity 0.3s;
    }
    &:hover {
      width: 140px;
      color: var(--main-card-background);
      border-color: var(--main-color);
      background-color: var(--main-color);
      .font-awesome {
        color: var(--main-card-background);
      }
      .set-text {
        opacity: 1;
      }
    }
  }
}
.set-list {
  .title {
    display: block;
    width: 100%;
    margin: 1rem 0;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid var(--main-color);
    border-radius: 4px 8px 8px 4px;
    background-color: var(--main-border-shadow);
    padding: 6px 0 6px 12px;
    &:first-child {
      margin-top: 0;
    }
  }
  .set-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .set-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      border-radius: 8px;
      .options {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9375rem;
        border-radius: 8px;
        margin: 4px 8px;
        padding: 6px 8px;
        min-width: 30px;
        background-color: var(--main-card-border);
        transition:
          color 0.3s,
          background-color 0.3s;
        &.choose,
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .num {
        margin: 0 4px;
      }
      input {
        border: none;
        outline: none;
        border-radius: 8px;
        color: var(--main-font-color);
        font-family: var(--main-font-family);
        background-color: var(--main-border-shadow);
        height: 100%;
        padding: 0 1rem;
        font-size: 14px;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 512px) {
      flex-direction: column;
      align-items: flex-start;
      .set-options {
        margin-top: 8px;
        .options {
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
