<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        v-if="rightMenuShow"
        class="right-menu"
        @click="rightMenuShow = false"
        @contextmenu.stop="closeRightMenu"
      >
        <div
          :style="{
            left: rightMenuX + 'px',
            top: rightMenuY + 'px',
          }"
          ref="rightMenuRef"
          class="menu-content s-card hover"
          @contextmenu.stop="closeRightMenu"
        >
          <div class="tools">
            <div class="btn" :title="i18n('components.right-menu.back')" @click="rightMenuFunc('back')">
              <i class="font-awesome fa-solid fa-angle-left"></i>
            </div>
            <div class="btn" :title="i18n('components.right-menu.forward')" @click="rightMenuFunc('forward')">
              <i class="font-awesome fa-solid fa-angle-right"></i>
            </div>
            <div class="btn" :title="i18n('components.right-menu.refresh')" @click="rightMenuFunc('reload')">
              <i class="font-awesome fa-solid fa-rotate-right"></i>
            </div>
            <div class="btn" :title="i18n('components.right-menu.go-back-to-top')" @click="smoothScrolling">
              <i class="font-awesome fa-solid fa-arrow-up"></i>
            </div>
          </div>
          <div class="all-menu">
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go(shufflePost(theme.postData))"
            >
              <i class="font-awesome fa-solid fa-shuffle"></i>
              <span class="name">{{ i18n('components.right-menu.go-to-random-post') }}</span>
            </div>
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go('/pages/categories')"
            >
              <i class="font-awesome fa-solid fa-folder-open"></i>
              <span class="name">{{ i18n('components.right-menu.all-categories') }}</span>
            </div>
            <div v-if="clickedType === 'normal'" class="btn" @click="router.go('/pages/tags')">
              <i class="font-awesome fa-solid fa-hashtag"></i>
              <span class="name">{{ i18n('components.right-menu.all-tags') }}</span>
            </div>
            <!-- Clinking on Links -->
            <div v-if="clickedType === 'link'" class="btn" @click="rightMenuFunc('open-link')">
              <i class="font-awesome fa-solid fa-window-maximize"></i>
              <span class="name">{{ i18n('components.right-menu.open-link-in-new-tab') }}</span>
            </div>
            <div
              v-if="clickedType === 'link'"
              class="btn"
              @click="
                copyText(clickedTypeData?.getAttribute('original-href') || clickedTypeData?.href)
              "
            >
              <i class="font-awesome fa-solid fa-link"></i>
              <span class="name">{{ i18n('components.right-menu.copy-link') }}</span>
            </div>
            <!-- Clinking on Images -->
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="copyImage(clickedTypeData?.src)"
            >
              <i class="font-awesome fa-solid fa-images"></i>
              <span class="name">{{ i18n('components.right-menu.copy-image') }}</span>
            </div>
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="downloadImage(clickedTypeData?.src)"
            >
              <i class="font-awesome fa-solid fa-cloud-arrow-down"></i>
              <span class="name">{{ i18n('components.right-menu.download-image') }}</span>
            </div>
            <!-- Clinking on Input Fields -->
            <div
              v-if="clickedType === 'input' && typeof clickedTypeData.value === 'string'"
              class="btn"
              @click="rightMenuFunc('input-paste')"
            >
              <i class="font-awesome fa-solid fa-paste"></i>
              <span class="name">{{ i18n('components.right-menu.paste-text') }}</span>
            </div>
            <!-- Clinking on Selected Text -->
            <a
              v-if="(clickedType === 'text' || clickedType === 'input') && isLink(clickedTypeData)"
              :href="`${isLink(clickedTypeData)}`"
              class="btn right-menu-link"
              target="_blank"
            >
              <i class="font-awesome fa-solid fa-link"></i>
              <span class="name">{{ i18n('components.right-menu.open-in-new-tab') }}</span>
            </a>
            <div
              v-if="clickedType === 'text' || clickedType === 'input'"
              class="btn"
              @click="copyText(clickedTypeData)"
            >
              <i class="font-awesome fa-solid fa-copy"></i>
              <span class="name">{{ i18n('components.right-menu.copy-selected-text') }}</span>
            </div>
            <div
              v-if="clickedType === 'text' && !commentCopyShow && theme.comment.type === 'artalk'"
              class="btn"
              @click="commentCopy(clickedTypeData)"
            >
              <i class="font-awesome fa-solid fa-comment"></i>
              <span class="name">{{ i18n('components.right-menu.comment-selected-content') }}</span>
            </div>
          </div>
          <!-- General -->
          <div class="all-menu general">
            <!-- Copyright Policy -->
            <div class="btn" @click="router.go('/pages/copyright')">
              <i class="font-awesome fa-solid fa-copyright"></i>
              <span class="name">{{ i18n('components.right-menu.copyright-policy') }}</span>
            </div>
            <!-- Privacy Policy -->
            <div class="btn" @click="router.go('/pages/privacy')">
              <i class="font-awesome fa-solid fa-shield-halved"></i>
              <span class="name">{{ i18n('components.right-menu.privacy-policy') }}</span>
            </div>
          </div>
          <div class="all-menu general">
            <!-- Copy Address of This Page -->
            <div class="btn" @click="rightMenuFunc('copy-link')">
              <i class="font-awesome fa-solid fa-copy"></i>
              <span class="name">{{ i18n('components.right-menu.copy-address-of-this-page') }}</span>
            </div>
            <!-- Dark/Light Mode -->
            <div class="btn" @click.stop="store.changeThemeType">
              <i
                :class="`font-awesome fa-solid fa-${themeType === 'auto' ? 'moon' : themeType === 'dark' ? 'sun' : 'wand-sparkles'}`"
              />
              <span class="name">
                {{
                  themeType === "auto"
                    ? i18n('components.right-menu.dark-mode')
                    : themeType === "dark"
                      ? i18n('components.right-menu.light-mode')
                      : i18n('components.right-menu.automatic-mode')
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Quickly Comment -->
    <Modal
      :show="commentCopyShow"
      :title="i18n('components.right-menu.quickly-comment')"
      titleIcon="comment"
      @mask-click="commentCopyClose"
      @modal-close="commentCopyClose"
    >
      <span class="modal-tip">{{ i18n('components.right-menu.quickly-comment-tip') }}</span>
      <Artalk :fill="commentCopyData" />
    </Modal>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { smoothScrolling, shufflePost, copyText, copyImage, downloadImage } from "@/utils/helper";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const router = useRouter();
const store = mainStore();
const { theme } = useData();
const { useRightMenu, themeType } = storeToRefs(store);

// Right Click Menu Data
const rightMenuX = ref(0);
const rightMenuY = ref(0);
const clickedType = ref("normal");
const clickedTypeData = ref(null);
const rightMenuRef = ref(null);
const rightMenuShow = ref(false);

// Quickly Comment
const commentCopyShow = ref(false);
const commentCopyData = ref(null);
const openRightMenu = (e) => {
  // Check if openable.
  if (e.ctrlKey || !useRightMenu.value) return true;
  if (window.innerWidth < 768) return true;
  e.preventDefault();
  rightMenuShow.value = false;
  checkClickType(e?.target);
  nextTick().then(() => {
    const calculateMenuPosition = () => {
      const menuWidth = rightMenuRef.value?.offsetWidth;
      const menuHeight = rightMenuRef.value?.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let correctX = e.clientX;
      let correctY = e.clientY;
      const marginWidth = 20;
      if (correctX + menuWidth > screenWidth - marginWidth) {
        correctX = screenWidth - menuWidth - marginWidth;
      }
      if (correctY + menuHeight > screenHeight - marginWidth) {
        correctY = screenHeight - menuHeight - marginWidth;
      }
      if (correctX < marginWidth) {
        correctX = marginWidth;
      }
      if (correctY < marginWidth) {
        correctY = marginWidth;
      }
      rightMenuX.value = correctX;
      rightMenuY.value = correctY;
    };
    rightMenuShow.value = true;
    nextTick().then(() => calculateMenuPosition());
  });
};

const closeRightMenu = (e) => {
  e?.preventDefault();
  rightMenuShow.value = false;
  rightMenuX.value = 0;
  rightMenuY.value = 0;
  clickedType.value = "normal";
  clickedTypeData.value = null;
  commentCopyData.value = false;
};

const checkClickType = (target) => {
  if (!target?.tagName) return false;
  clickedTypeData.value =
    window.getSelection().toString().length > 0 ? window.getSelection().toString() : target;
  switch (target.tagName) {
    case "A":
      clickedType.value = "link";
      break;
    case "IMG":
      clickedType.value = "image";
      break;
    case "INPUT":
    case "TEXTAREA":
      clickedType.value = "input";
      break;
    default:
      if (window.getSelection().toString().length > 0) {
        clickedType.value = "text";
      } else {
        clickedType.value = "normal";
      }
      break;
  }
};

const rightMenuFunc = async (type) => {
  try {
    if (!type) return false;
    switch (type) {
      case "back":
        window.history.back();
        break;
      case "forward":
        window.history.forward();
        break;
      case "reload":
        window.location.reload();
        break;
      case "open-link":
        window.open(clickedTypeData.value?.href);
        break;
      case "copy-link":
        const pageLink = theme.value.site + router.route.path;
        if (pageLink) copyText(pageLink);
        break;
      case "input-paste":
        const text = await navigator.clipboard.readText();
        if (clickedTypeData.value && typeof clickedTypeData.value === "object") {
          const inputElement = clickedTypeData.value;
          const start = inputElement.selectionStart;
          const end = inputElement.selectionEnd;
          const value = inputElement.value;
          const newValue = value.substring(0, start) + text + value.substring(end);
          inputElement.value = newValue;
          const newCursorPosition = start + text.length;
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
        break;
      default:
        return false;
    }
  } catch (error) {
    $message.error("Right Click Menu Error, please try again.");
    console.error("Right Click Menu Error: ", error);
  }
};

const isLink = (data) => {
  if (!data) return false;
  const hasProtocol = /^(http|https):\/\//i.test(data);
  const urlData = hasProtocol ? data : `http://${data}`;
  try {
    new URL(urlData);
    return urlData;
  } catch (error) {
    return false;
  }
};

const commentCopy = (data) => {
  if (!data) return false;
  let commentData = "> " + data.trim().replace(/\s+/g, " ");
  if (commentData.length >= 200) {
    commentData = commentData.substring(0, 200) + "...";
  }
  commentCopyData.value = commentData;
  commentCopyShow.value = true;
};

const commentCopyClose = () => {
  commentCopyShow.value = false;
  if (typeof $comment !== "undefined") $comment.reload();
};

defineExpose({ openRightMenu });
</script>

<style lang="scss" scoped>
.right-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  transition: opacity 0.2s;
  .menu-content {
    position: absolute;
    width: 180px;
    background-color: var(--main-card-background);
    animation: fade-up 0.2s forwards;
    transition:
      opacity 0.3s,
      border-color 0.3s,
      box-shadow 0.3s,
      background-color 0.3s;
    .tools {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--main-card-border);
      .btn {
        width: 34px;
        height: 34px;
        min-width: 34px;
      }
    }
    .all-menu {
      margin-top: 12px;
      .btn {
        justify-content: flex-start;
        margin-bottom: 6px;
        .font-awesome {
          font-size: 20px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      &.general {
        padding-top: 12px;
        border-top: 1px solid var(--main-card-border);
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 8px;
      transition:
        color 0.3s,
        background-color 0.3s;
      .font-awesome {
        font-size: 20px;
        transition: color 0.3s;
      }
      .name {
        margin-left: 12px;
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
        .font-awesome {
          color: var(--main-card-background);
        }
      }
    }
  }
}
.modal-tip {
  font-size: 15px;
  margin-top: -4px;
  margin-bottom: 1rem;
  display: block;
  color: var(--main-font-second-color);
  border-left: 4px solid var(--main-card-border);
  border-radius: 4px;
  padding: 8px 0 8px 12px;
  background-color: var(--main-card-second-background);
}
</style>
