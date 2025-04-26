<template>
  <!-- Tips Button -->
  <div v-if="rewardData.enable" class="reward">
    <div class="reward-btn" @click="rewardShow = true">
      <i class="font-awesome fa-solid fa-money-check-dollar" />
      <span class="text"> {{ i18n('components.reward-btn') }} </span>
    </div>
    <!-- Tip Pane -->
    <Modal
      :show="rewardShow"
      :maxWidth="430"
      :title="i18n('components.reward-btn')"
      titleIcon="money-check-dollar"
      @mask-click="rewardShow = false"
      @modal-close="rewardShow = false"
    >
      <div class="reward-card">
        <span class="thank">🙏 Thank You!</span>
        <!-- TODO: ACTUAL LINK FOR SPONSORING -->
        <div v-if="showJump" class="all-list s-card hover" @click="toRewardList">
          <span class="title">Sponsors List</span>
          <span class="tip">
            The sponsored money will be...
          </span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const router = useRouter();
const { theme } = useData();
const { rewardData } = theme.value;

const props = defineProps({
  showJump: {
    type: Boolean,
    default: true,
  },
});

const rewardShow = ref(false);

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
