<template>
  <div ref="commentRef" id="comment-dom" :class="['comment-content', 'twikoo', { fill }]" />
</template>

<script setup>
import initComments from "@/utils/initComments";

const props = defineProps({
  fill: {
    type: [Boolean, String],
    default: false,
  },
});

const { theme } = useData();
const { comment } = theme.value;

const twikoo = ref(null);
const commentRef = ref(null);

const initTwikoo = async () => {
  try {
    await nextTick();
    const Twikoo = await initComments(theme.value);
    twikoo.value = Twikoo.init({
      el: commentRef.value || "#comment-dom",
      envId: comment.twikoo.envId,
      onCommentLoaded: () => {
        console.log("Comments Loaded");
        if (props.fill) fillComments(props.fill);
      },
    });
    return twikoo.value;
  } catch (error) {
    console.error("Initializing Comment Failed: ", error);
  }
};

const fillComments = (data) => {
  console.log("Filling Comment: ", data);
  const commentDom = document.querySelector(".tk-input.el-textarea");
  if (!commentDom) return false;
  const commentInput = commentDom.querySelector("textarea");
  commentInput.value = data + "\n\n";
  commentInput.focus();
};

onMounted(() => {
  initTwikoo();
});
</script>
