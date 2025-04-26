<!-- 弹窗组件 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <div class="modal-mask" @click.stop="maskClick" />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
          }"
          class="modal-main s-card"
          @click.stop
        >
          <!-- Title -->
          <div v-if="title" class="title">
            <div class="title-left">
              <i v-if="titleIcon" :class="`font-awesome fa-solid fa-${titleIcon}`"></i>
              <span class="title-text">{{ title }}</span>
            </div>
            <!-- Close Button -->
            <i v-if="showClose" class="font-awesome fa-solid fa-xmark close" @click="modalClose" />
          </div>
          <!-- Content -->
          <div class="modal-content" :style="{ '--height': maxHeight + 'vh' }">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  titleIcon: {
    type: String,
    default: "",
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  maxWidth: {
    type: [Number, String],
    default: 800,
  },
  maxHeight: {
    type: Number,
    default: 80,
  },
});

const emit = defineEmits(["mask-click", "modal-close"]);

const maskClick = () => emit("mask-click");
const modalClose = () => emit("modal-close");

watch(
  () => props.show,
  (val) => {
    document.body.style.overflowY = val ? "hidden" : "";
  },
);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .modal-main {
    position: absolute;
    padding: 0;
    animation: fade-up 0.5s forwards;
    width: calc(100% - 40px);
    overflow: hidden;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      padding: 20px;
      height: 64px;
      background-color: var(--main-card-background);
      border-bottom: 1px solid var(--main-card-border);
      .title-left {
        width: 100%;
        .font-awesome {
          font-size: 1.25rem;
          margin-right: 8px;
        }
      }
      .close {
        position: absolute;
        right: 20px;
        margin-right: 0;
        font-size: 1rem;
        border-radius: 8px;
        padding: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: var(--main-card-border);
        }
      }
    }
    .modal-content {
      max-height: calc(var(--height) - 46px);
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
