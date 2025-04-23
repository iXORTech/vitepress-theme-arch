<template>
  <Teleport to="body">
    <!-- 右键菜单 -->
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
            <div class="btn" title="后退" @click="rightMenuFunc('back')">
              <i class="font-awesome fa-solid fa-angle-left"></i>
            </div>
            <div class="btn" title="前进" @click="rightMenuFunc('forward')">
              <i class="font-awesome fa-solid fa-angle-right"></i>
            </div>
            <div class="btn" title="刷新" @click="rightMenuFunc('reload')">
              <i class="font-awesome fa-solid fa-rotate-right"></i>
            </div>
            <div class="btn" title="返回顶部" @click="smoothScrolling">
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
              <span class="name">随便逛逛</span>
            </div>
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go('/pages/categories')"
            >
              <i class="font-awesome fa-solid fa-folder-open"></i>
              <span class="name">全部分类</span>
            </div>
            <div v-if="clickedType === 'normal'" class="btn" @click="router.go('/pages/tags')">
              <i class="font-awesome fa-solid fa-hashtag"></i>
              <span class="name">全部标签</span>
            </div>
            <!-- 链接类型 -->
            <div v-if="clickedType === 'link'" class="btn" @click="rightMenuFunc('open-link')">
              <i class="font-awesome fa-solid fa-window-maximize"></i>
              <span class="name">新标签页打开</span>
            </div>
            <div
              v-if="clickedType === 'link'"
              class="btn"
              @click="
                copyText(clickedTypeData?.getAttribute('original-href') || clickedTypeData?.href)
              "
            >
              <i class="font-awesome fa-solid fa-link"></i>
              <span class="name">复制链接地址</span>
            </div>
            <!-- 图片类型 -->
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="copyImage(clickedTypeData?.src)"
            >
              <i class="font-awesome fa-solid fa-images"></i>
              <span class="name">复制此图片</span>
            </div>
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="downloadImage(clickedTypeData?.src)"
            >
              <i class="font-awesome fa-solid fa-cloud-arrow-down"></i>
              <span class="name">下载此图片</span>
            </div>
            <!-- 输入框 -->
            <div
              v-if="clickedType === 'input' && typeof clickedTypeData.value === 'string'"
              class="btn"
              @click="rightMenuFunc('input-paste')"
            >
              <i class="font-awesome fa-solid fa-paste"></i>
              <span class="name">粘贴文本</span>
            </div>
            <!-- 选中文本 -->
            <a
              v-if="(clickedType === 'text' || clickedType === 'input') && isLink(clickedTypeData)"
              :href="`${isLink(clickedTypeData)}`"
              class="btn right-menu-link"
              target="_blank"
            >
              <i class="font-awesome fa-solid fa-link"></i>
              <span class="name">在新标签页打开</span>
            </a>
            <div
              v-if="clickedType === 'text' || clickedType === 'input'"
              class="btn"
              @click="copyText(clickedTypeData)"
            >
              <i class="font-awesome fa-solid fa-copy"></i>
              <span class="name">复制选中文本</span>
            </div>
            <div
              v-if="clickedType === 'text' && !commentCopyShow && theme.comment.type === 'artalk'"
              class="btn"
              @click="commentCopy(clickedTypeData)"
            >
              <i class="font-awesome fa-solid fa-comment"></i>
              <span class="name">评论选中内容</span>
            </div>
          </div>
          <!-- 通用菜单 -->
          <div class="all-menu general">
            <!-- 版权协议 -->
            <div class="btn" @click="router.go('/pages/copyright')">
              <i class="font-awesome fa-solid fa-copyright"></i>
              <span class="name">版权协议</span>
            </div>
            <!-- 隐私政策 -->
            <div class="btn" @click="router.go('/pages/privacy')">
              <i class="font-awesome fa-solid fa-shield-halved"></i>
              <span class="name">隐私政策</span>
            </div>
          </div>
          <div class="all-menu general">
            <!-- 复制地址 -->
            <div class="btn" @click="rightMenuFunc('copy-link')">
              <i class="font-awesome fa-solid fa-copy"></i>
              <span class="name">复制本页地址</span>
            </div>
            <!-- 明暗模式 -->
            <div class="btn" @click.stop="store.changeThemeType">
              <i
                :class="`font-awesome fa-solid fa-${themeType === 'auto' ? 'moon' : themeType === 'dark' ? 'sun' : 'wand-sparkles'}`"
              />
              <span class="name">
                {{
                  themeType === "auto" ? "深色模式" : themeType === "dark" ? "浅色模式" : "跟随系统"
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- 快速评论 -->
    <Modal
      :show="commentCopyShow"
      title="快速评论"
      titleIcon="comment"
      @mask-click="commentCopyClose"
      @modal-close="commentCopyClose"
    >
      <span class="modal-tip"> 您无需删除现有的输入框内容，直接在下方评论即可 </span>
      <Artalk :fill="commentCopyData" />
    </Modal>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { smoothScrolling, shufflePost, copyText, copyImage, downloadImage } from "@/utils/helper";

const router = useRouter();
const store = mainStore();
const { theme } = useData();
const { useRightMenu, themeType } = storeToRefs(store);

// 右键菜单数据
const rightMenuX = ref(0);
const rightMenuY = ref(0);
const clickedType = ref("normal");
const clickedTypeData = ref(null);
const rightMenuRef = ref(null);
const rightMenuShow = ref(false);

// 快速评论
const commentCopyShow = ref(false);
const commentCopyData = ref(null);

// 开启右键菜单
const openRightMenu = (e) => {
  // 检测是否可开启
  if (e.ctrlKey || !useRightMenu.value) return true;
  if (window.innerWidth < 768) return true;
  e.preventDefault();
  rightMenuShow.value = false;
  // 获取点击类型
  checkClickType(e?.target);
  nextTick().then(() => {
    // 处理菜单位置
    const calculateMenuPosition = () => {
      // 获取菜单的宽度和高度
      const menuWidth = rightMenuRef.value?.offsetWidth;
      const menuHeight = rightMenuRef.value?.offsetHeight;
      // 获取屏幕的宽度和高度
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      // 计算正确的坐标值
      let correctX = e.clientX;
      let correctY = e.clientY;
      // 保留边距
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
    // 显示菜单
    rightMenuShow.value = true;
    // DOM 更新
    nextTick().then(() => calculateMenuPosition());
  });
};

// 关闭右键菜单
const closeRightMenu = (e) => {
  e?.preventDefault();
  rightMenuShow.value = false;
  rightMenuX.value = 0;
  rightMenuY.value = 0;
  clickedType.value = "normal";
  clickedTypeData.value = null;
  commentCopyData.value = false;
};

// 判断点击元素类型
const checkClickType = (target) => {
  if (!target?.tagName) return false;
  // 写入内容
  clickedTypeData.value =
    window.getSelection().toString().length > 0 ? window.getSelection().toString() : target;
  switch (target.tagName) {
    case "A":
      // 链接类型
      clickedType.value = "link";
      break;
    case "IMG":
      // 图片类型
      clickedType.value = "image";
      break;
    case "INPUT":
    case "TEXTAREA":
      // 输入框类型
      clickedType.value = "input";
      break;
    default:
      if (window.getSelection().toString().length > 0) {
        // 已选中的文本
        clickedType.value = "text";
      } else {
        // 普通模式
        clickedType.value = "normal";
      }
      break;
  }
};

// 右键菜单点击事件
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
          // 在光标位置插入文本
          const newValue = value.substring(0, start) + text + value.substring(end);
          inputElement.value = newValue;
          // 更新光标位置
          const newCursorPosition = start + text.length;
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
        break;
      default:
        return false;
    }
  } catch (error) {
    $message.error("右键菜单发生错误，请重试");
    console.error("右键菜单出错：", error);
  }
};

// 选中内容是否为链接
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

// 评论选中内容
const commentCopy = (data) => {
  if (!data) return false;
  let commentData = "> " + data.trim().replace(/\s+/g, " ");
  if (commentData.length >= 200) {
    commentData = commentData.substring(0, 200) + "...";
  }
  commentCopyData.value = commentData;
  commentCopyShow.value = true;
};

// 关闭快速评论
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
