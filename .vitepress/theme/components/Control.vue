<!-- Control Panel -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in" @before-enter="changeCloseStyle">
      <div v-if="store.controlShow" class="control" @click="store.changeShowStatus('controlShow')">
        <!-- Close Button -->
        <div ref="closeControlRef" class="close-control">
          <i class="font-awesome fa-solid fa-xmark"></i>
        </div>
        <!-- Background Mask -->
        <div class="control-mask" />
        <!-- Control Contents -->
        <div class="control-content" @click.stop>
          <!-- Functionalities -->
          <div class="menu">
            <div class="menu-item open" :title="i18n('components.control.appearance-mode-switch')" @click.stop="store.changeThemeType">
              <i v-if="store.themeType === 'dark'" class="font-awesome fa-solid fa-moon"></i>
              <i v-if="store.themeType === 'light'" class="font-awesome fa-solid fa-sun"></i>
              <i v-if="store.themeType === 'auto'" class="font-awesome fa-solid fa-wand-sparkles"></i>
            </div>
            <div
              :class="['menu-item', { open: store.useRightMenu }]"
              :title="i18n('components.control.right-click-menu-switch')"
              @click.stop="rightMenuSwitch"
            >
              <i class="font-awesome fa-solid fa-list"></i>
            </div>
            <div
              :class="['menu-item', { open: store.backgroundBlur }]"
              :title="i18n('components.control.background-blur-switch')"
              @click.stop="store.changeShowStatus('backgroundBlur')"
            >
              <i class="font-awesome fa-solid fa-eye-slash"></i>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { mainStore } from "@/store";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const store = mainStore();

const closeControlRef = ref(null);

// Fix Position of Close Button
const changeCloseStyle = () => {
  nextTick().then(() => {
    const controlOpenDom = document.querySelector("#open-control");
    if (controlOpenDom && closeControlRef.value) {
      const { top, left } = controlOpenDom.getBoundingClientRect();
      closeControlRef.value.style.top = `${top}px`;
      closeControlRef.value.style.left = `${left}px`;
      closeControlRef.value.style.opacity = "1";
    }
  });
};

// Right Click Menu Switch
const rightMenuSwitch = () => {
  store.useRightMenu = !store.useRightMenu;
  $message.info(i18n(
    'components.control.right-click-menu-' + (store.useRightMenu ? 'enable' : 'disable')
  ));
};
</script>

<style lang="scss" scoped>
.control {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1109;
  .close-control {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    opacity: 0;
    transition:
      background-color 0.3s,
      opacity 0.3s;
    border-radius: 50%;
    cursor: pointer;
    .font-awesome {
      font-size: 18px;
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
  .control-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .control-content {
    position: absolute;
    animation: fade-up 0.5s forwards;
    .menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 6px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid var(--main-card-border);
        background-color: var(--main-card-background);
        transition:
          transform 0.3s,
          background-color 0.3s;
        cursor: pointer;
        .font-awesome {
          font-size: 24px;
          color: var(--main-font-color);
          transition: color 0.3s;
        }
        &.open {
          background-color: var(--main-color);
          .font-awesome {
            color: #fff;
          }
        }
        &:hover {
          transform: scale(1.05);
        }
        &:active {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
