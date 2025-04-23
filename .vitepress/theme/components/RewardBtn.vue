<!-- 打赏按钮 -->
<template>
  <div v-if="rewardData.enable" class="reward">
    <div class="reward-btn" @click="rewardShow = true">
      <i class="font-awesome fa-solid fa-money-check-dollar" />
      <span class="text">赞赏博主</span>
    </div>
    <!-- 打赏面板 -->
    <Modal
      :show="rewardShow"
      :maxWidth="430"
      title="赞赏博主"
      titleIcon="money-check-dollar"
      @mask-click="rewardShow = false"
      @modal-close="rewardShow = false"
    >
      <div class="reward-card">
        <span class="thank">🙏 感谢您赐予我前进的力量</span>
        <!-- TODO: ACTUAL LINK FOR SPONSORING -->
        <div v-if="showJump" class="all-list s-card hover" @click="toRewardList">
          <span class="title">全部赞赏者名单</span>
          <span class="tip">
            赞赏金额将全部用于开源项目维护，以及服务器、域名及各类云服务的开销
          </span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
const router = useRouter();
const { theme } = useData();
const { rewardData } = theme.value;

const props = defineProps({
  showJump: {
    type: Boolean,
    default: true,
  },
});

// 赞赏显示
const rewardShow = ref(false);

// 跳转至赞赏名单
const toRewardList = () => {
  rewardShow.value = false;
  router.go("/pages/thanks");
};
</script>

<style lang="scss" scoped>
.reward {
  position: relative;
  display: flex;
  justify-content: center;
  width: max-content;
  margin: 1rem auto;
  user-select: none;
  cursor: pointer;
  .reward-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 120px;
    border-radius: 8px;
    color: #fff;
    background-color: var(--main-color-red);
    transition: box-shadow 0.5s;
    .font-awesome {
      color: #fff;
      margin-right: 6px;
    }
    &:hover {
      box-shadow: 0 0 40px 6px #ff384270;
    }
  }
}
.reward-card {
  .thank {
    display: inline-flex;
    justify-content: center;
    margin-bottom: 1rem;
    width: 100%;
    color: var(--main-color);
    font-weight: bold;
  }
  .qr {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    .qr-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        height: auto;
        border-radius: 16px;
        overflow: hidden;
      }
      .tip {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.8rem;
        .font-awesome {
          margin-right: 6px;
          font-size: 18px;
        }
      }
      &:hover {
        .font-awesome {
          color: var(--main-color);
        }
      }
    }
  }
  .all-list {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--main-card-second-background);
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
      transition: color 0.3s;
    }
    .tip {
      text-align: center;
      font-size: 12px;
      opacity: 0.6;
    }
    &:hover {
      .title {
        color: var(--main-color);
      }
    }
  }
}
</style>
