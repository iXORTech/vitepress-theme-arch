<template>
  <Modal
    :show="store.searchShow"
    :title="i18n('components.search.title')"
    titleIcon="magnifying-glass"
    @mask-click="store.changeShowStatus('searchShow')"
    @modal-close="store.changeShowStatus('searchShow')"
  >
    <ais-instant-search
      :search-client="searchClient"
      :future="{
        preserveSharedStateOnUnmount: true,
      }"
      :index-name="theme.search.indexName"
      @state-change="searchChange"
    >
      <ais-configure :hits-per-page.camel="8" />
      <ais-search-box :placeholder="i18n('components.search.tip')" autofocus />
      <ais-hits v-if="hasSearchValue">
        <template v-slot="{ items }">
          <Transition name="fade" mode="out-in">
            <div v-if="formatSearchData(items)?.length" class="search-list">
              <div
                v-for="(item, index) in formatSearchData(items)"
                :key="index"
                class="search-item s-card hover"
                @click="jumpSearch(item.url)"
              >
                <p class="title" v-html="item.title" />
                <p v-if="item?.anchor" class="anchor" v-html="item.anchor" />
                <p v-if="item?.content" class="content s-card" v-html="item.content" />
              </div>
            </div>
            <div v-else class="no-result">
              <i class="font-awesome fa-solid fa-magnifying-glass" />
              <span class="text">{{ i18n('components.search.no-result') }}</span>
            </div>
          </Transition>
        </template>
      </ais-hits>
      <ais-pagination v-if="hasSearchValue" />
      <ais-stats>
        <template v-slot="{ processingTimeMS }">
          <div class="information">
            <span v-if="hasSearchValue" class="text">
              {{ i18n('components.search.search-used-ms-before') }}
              {{ processingTimeMS }}
              {{ i18n('components.search.search-used-ms-after') }}
            </span>
          </div>
          <a class="power" href="https://www.algolia.com/" target="_blank">
            <i class="font-awesome fa-brands fa-algolia" />
            <span class="name">Algolia</span>
          </a>
        </template>
      </ais-stats>
    </ais-instant-search>
  </Modal>
</template>

<script setup>
import { mainStore } from "@/store";
import { liteClient } from "algoliasearch/lite";
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()
const store = mainStore();
const router = useRouter();

const { theme } = useData();
const { appId, apiKey } = theme.value.search;

const searchClient = liteClient(appId, apiKey);

const hasSearchValue = ref(false);

const searchChange = ({ uiState, setUiState }) => {
  const searchData = Object.values(uiState);
  hasSearchValue.value = searchData.length > 0 && searchData[0].query?.length > 0;
  setUiState(uiState);
};

const formatSearchData = (data) => {
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const search = data[i];
    const url = search?.url;
    const type = search.type === "lvl1" ? "post" : "content";
    const title = search._highlightResult?.hierarchy?.lvl1?.value;
    const anchor = search._highlightResult?.hierarchy?.[search.type]?.value;
    const content = search._highlightResult?.content?.value;
    const searchData = { url, type, title, anchor, content };
    results.push(searchData);
  }
  console.log(results);
  return results;
};

const jumpSearch = (url) => {
  store.changeShowStatus("searchShow");
  router.go(url);
};

onBeforeUnmount(() => {
  hasSearchValue.value = false;
});
</script>

<style lang="scss">
.ais-InstantSearch {
  height: 100%;
  .ais-SearchBox {
    height: 40px;
    width: 100%;
    .ais-SearchBox-input {
      width: 100%;
      outline: none;
      border-radius: 8px;
      font-size: 16px;
      padding: 0.6rem 1rem;
      color: var(--main-font-color);
      font-family: var(--main-font-family);
      border: 1px solid var(--main-card-border);
      background-color: var(--main-card-second-background);
      transition:
        border-color 0.3s,
        box-shadow 0.3s;
      &:focus {
        border-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
      }
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
    .ais-SearchBox-loadingIndicator,
    .ais-SearchBox-submit,
    .ais-SearchBox-reset {
      display: none;
    }
  }
  .ais-Hits {
    margin-top: 20px;
    min-height: 300px;
    height: 100%;
    .no-result {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .font-awesome {
        font-size: 40px;
        margin-bottom: 12px;
      }
      .text {
        font-size: 18px;
        opacity: 0.6;
      }
    }
    .search-list {
      .search-item {
        margin-bottom: 12px;
        .title {
          display: inline;
          font-size: 16px;
          margin-bottom: 6px;
        }
        .anchor {
          margin-top: 6px;
          color: var(--main-font-second-color);
          font-size: 14px;
          &::before {
            content: "# ";
          }
        }
        .content {
          color: var(--main-font-second-color);
          margin-top: 0.8rem;
          font-size: 12px;
          padding: 8px;
          border-radius: 8px;
        }
        p {
          margin: 0;
          mark {
            background-color: transparent;
            color: var(--main-color);
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .ais-Pagination {
    margin-top: 20px;
    .ais-Pagination-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .ais-Pagination-item {
        margin: 0 4px;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        .ais-Pagination-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          &:hover {
            color: var(--main-font-color);
          }
        }
        &:hover {
          color: var(--main-font-color);
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--selected {
          font-weight: bold;
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--disabled,
        &.ais-Pagination-item--nextPage,
        &.ais-Pagination-item--lastPage {
          opacity: 0.8;
        }
      }
    }
  }
  .ais-Stats {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    opacity: 0.8;
    font-size: 14px;
    .power {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      opacity: 0.6;
      transition:
        color 0.3s,
        opacity 0.3s;
      .font-awesome {
        margin-right: 4px;
        font-size: 20px;
        transition: color 0.3s;
      }
      .name {
        font-weight: bold;
      }
      &:hover {
        opacity: 1;
        color: var(--main-color);
        .font-awesome {
          color: var(--main-color);
        }
      }
    }
    @media (max-width: 512px) {
      justify-content: center;
      .information {
        display: none;
      }
    }
  }
}
</style>
