<template>
  <footer id="main-footer" class="main-footer">
    <div class="footer-content">
      <div class="copyright">
        <span class="time" v-if="startYear !== thisYear">Copyright © {{ startYear }} - {{ thisYear }} </span>
        <span class="time" v-else>Copyright © {{ startYear }} </span>
        <a :href="theme.siteMeta.author.link" class="author link" target="_blank">
          {{ theme.siteMeta.author.name }}
        </a>
        <a v-if="theme.icp" class="icp link" href="https://beian.miit.gov.cn/" target="_blank">
          <i class="font-awesome fa-solid fa-shield"></i>
          {{ theme.icp }}
        </a>
        <br/>
        <span class="by">Powered by</span>
        <span class="name">
          <a class="power link" href="https://vitepress.dev/" target="_blank">VitePress</a>
        </span>
        <span class="by">&</span>
        <span class="name">
          <a class="theme link" href="https://github.com/iXORTech/vitepress-theme-arch" target="_blank">VitePress Theme Arch</a>
        </span>
      </div>
      <div class="meta">
        <a class="rss link" href="https://blog.imsyy.top/rss.xml" target="_blank">
          <i class="font-awesome fa-solid fa-rss"></i>
          <span class="name">RSS</span>
        </a>
        <a
          class="cc link"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          <i class="font-awesome fa-brands fa-creative-commons"></i>
          <i class="font-awesome fa-brands fa-creative-commons-by"></i>
          <i class="font-awesome fa-brands fa-creative-commons-nc"></i>
          <i class="font-awesome fa-brands fa-creative-commons-nd"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const store = mainStore();
const { theme } = useData();
const { footerIsShow } = storeToRefs(store);

// Window Observer
const observer = ref(null);

// Year when the Website is Established
const startYear = computed(() => {
  const startYear = theme.value.since;
  if (startYear) {
    return new Date(startYear).getFullYear();
  } else {
    return new Date().getFullYear();
  }
});

// Year of the Current Year
const thisYear = computed(() => new Date().getFullYear());

// Footer Window Observer
const isShowFooter = () => {
  const footerDom = document.getElementById("main-footer");
  if (!footerDom) return false;
  if (observer.value) observer.value?.disconnect();
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      footerIsShow.value = entry.isIntersecting ? true : false;
    });
  });
  observer.value?.observe(footerDom);
};

onMounted(() => {
  isShowFooter();
});

onBeforeUnmount(() => {
  if (observer.value) observer.value?.disconnect();
});
</script>

<style lang="scss" scoped>
.main-footer {
  display: flex;
  margin-top: 1rem;
  padding: 1rem 0;
  background-color: var(--main-card-background);
  border-top: 1px solid var(--main-card-border);
  overflow: hidden;
  animation: show 0.3s backwards;
  transition:
    color 0.3s,
    border 0.3s,
    background-color 0.3s;

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    color: var(--main-font-color);
    line-height: 1;
    min-height: 32px;

    .copyright {
      .icp {
        .font-awesome {
          font-size: 20px;
          opacity: 0.6;
        }
      }
    }

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;

      .power {
        margin-right: 4px;

        .by {
          font-weight: normal;
          opacity: 0.8;
          margin-right: 6px;
        }
      }

      .rss {
        margin-right: 4px;

        .font-awesome {
          margin-right: 6px;
        }
      }

      .cc {
        .font-awesome {
          margin: 2px 2px 2px 2px;
          font-weight: normal;
        }
      }
    }

    .link {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 8px;
      margin: 0 2px;
      height: 38px;
      border-radius: 12px;
      transition:
        color 0.3s,
        background-color 0.3s;
      cursor: pointer;

      .font-awesome {
        font-size: 22px;
        margin-right: 4px;
        transition: color 0.3s;
      }

      &:hover {
        color: var(--main-color);
        background-color: var(--main-color-bg);

        .font-awesome {
          color: var(--main-color);
        }
      }
    }

    @media (max-width: 768px) {
      font-size: 14px;
      .meta {
        display: none;
      }
    }
    @media (max-width: 420px) {
      .copyright {
        .icp {
          .font-awesome {
            display: none;
          }
        }
      }
    }
  }
}
</style>
