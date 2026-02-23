<template>
  <div class="search-section">
    <div class="search-row">
      <form class="search-group" @submit.prevent="handleSearch">
        <SelectBar
          v-if="selectOptions?.options?.length > 0"
          :selectValue="localSelect"
          :options="selectOptions.options"
          :defaultOption="selectOptions.defaultOption"
          @update:selectValue="localSelect = $event"
          class="search-select"
        />
        <input
          type="search"
          v-model="localSearch"
          :placeholder="placeholder"
          class="search-input"
          @search="onClear"
        />
        <button type="submit" class="btn btn-primary btn-sm">
          {{ buttonText }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";
import { useModalStore } from "@/stores/modalStore";
import { useSearchStore } from "@/stores/searchStore";
import SelectBar from "./SelectBar.vue";

const props = defineProps({
  searchValue: { type: String, default: "" },
  selectValue: { type: String, default: "" },
  selectOptions: { type: Object, default: null },
  /*
  const searchOptions = {
    defaultOption: { value: "all", label: "전체" },
    options: [
      { value: "title", label: "제목" },
      { value: "content", label: "내용" },
    ],
  };
  */
  placeholder: { type: String, default: "검색어를 입력하세요" },
  buttonText: { type: String, default: "검색" },
  resetOnLeave: { type: Boolean, default: true },
});

const searchStore = useSearchStore();
const localSearch = ref(searchStore.searchValue || props.searchValue);
const localSelect = ref(searchStore.searchType || props.selectValue);

const emit = defineEmits([
  "update:searchValue",
  "update:selectValue",
  "search",
]);

const handleSearch = () => {
  const value = localSearch.value.trim();

  if (!value) {
    const modal = useModalStore();
    modal.warning("검색어를 입력해주세요");
    return;
  }

  searchStore.setSearchState(value, localSelect.value);
  emit("search", { searchValue: value, searchType: localSelect.value });
};

const onClear = () => {
  if (localSearch.value === "") {
    searchStore.reset();
    emit("search", { query: "", type: localSelect.value });
  }
};

onUnmounted(() => {
  if (props.resetOnLeave) {
    searchStore.reset();
  }
});
</script>

<style lang="scss" scoped>
.search-select {
  flex-shrink: 0;
  width: fit-content;
  max-width: 200px;
}

.search-input {
  flex: 1;
  min-width: 0;
}
</style>
