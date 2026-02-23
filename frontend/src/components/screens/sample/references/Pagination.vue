<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <!-- 맨 앞으로 (« ) - pageRange 초과 시만 표시 -->
      <li
        v-if="showFirstLast"
        class="page-item nav-item"
        :class="{ disabled: isFirstPage }"
      >
        <a class="page-link" @click.prevent="!isFirstPage && goToPage(1)">«</a>
      </li>

      <!-- 이전 (‹) -->
      <li class="page-item nav-item" :class="{ disabled: isFirstPage }">
        <a
          class="page-link"
          @click.prevent="!isFirstPage && goToPage(currentPage - 1)"
          >‹</a
        >
      </li>

      <!-- 페이지 번호 -->
      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage, 'break-item': page === '...' }"
      >
        <a
          class="page-link"
          @click.prevent="typeof page === 'number' && goToPage(page)"
          >{{ page }}</a
        >
      </li>

      <!-- 다음 (›) -->
      <li class="page-item nav-item" :class="{ disabled: isLastPage }">
        <a
          class="page-link"
          @click.prevent="!isLastPage && goToPage(currentPage + 1)"
          >›</a
        >
      </li>

      <!-- 맨 뒤로 (»)  - pageRange 초과 시만 표시 -->
      <li
        v-if="showFirstLast"
        class="page-item nav-item"
        :class="{ disabled: isLastPage }"
      >
        <a
          class="page-link"
          @click.prevent="!isLastPage && goToPage(totalPages)"
          >»</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  pageRange?: number;
  marginPages?: number;
  initialPage?: number;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  itemsPerPage: 10,
  pageRange: 5,
  marginPages: 1,
  initialPage: 1,
});

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const currentPage = ref(props.initialPage);

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage));
});

const isFirstPage = computed(() => currentPage.value <= 1);
const isLastPage = computed(() => currentPage.value >= totalPages.value);

const showFirstLast = computed(() => {
  return totalPages.value > props.pageRange;
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const range = props.pageRange;
  const current = currentPage.value;
  const margin = props.marginPages;

  if (total <= range) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfRange = Math.floor(range / 2);

  let start = Math.max(1, current - halfRange);
  let end = Math.min(total, start + range - 1);

  if (end - start < range - 1) {
    start = Math.max(1, end - range + 1);
  }

  // 앞쪽 margin pages
  for (let i = 1; i <= Math.min(margin, start - 1); i++) {
    pages.push(i);
  }
  if (start > margin + 1) {
    pages.push("...");
  }

  // 중간 range
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // 뒤쪽 margin pages
  if (end < total - margin) {
    pages.push("...");
  }
  for (let i = Math.max(end + 1, total - margin + 1); i <= total; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  emit("page-change", page);
};

watch(
  () => props.totalItems,
  () => {
    currentPage.value = 1;
  },
);

defineExpose({
  setPage: (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  },
  reset: () => {
    currentPage.value = 1;
  },
  getCurrentPage: () => currentPage.value,
});
</script>

<style lang="scss">
.pagination-wrapper {
  width: auto;
  max-width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-lg 0;
  box-sizing: border-box;
  margin: 0;
}

.pagination {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-item {
  display: inline-block;

  &.active .page-link {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-text-white;
    font-weight: $font-weight-semibold;
    pointer-events: none;
    box-shadow:
      0 4px 12px rgba($color-primary, 0.3),
      0 2px 4px rgba($color-primary, 0.2);
    transform: translateY(-2px);
  }

  &.disabled .page-link {
    cursor: default;
    pointer-events: none;
    box-shadow: none;
    transform: none;
  }
}

.page-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: 1;
  color: $color-text-primary;
  text-decoration: none;
  background-color: $color-bg-white;
  border: $border-width solid $color-border;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $transition-base;
  user-select: none;
  position: relative;

  &:hover {
    background: linear-gradient(
      135deg,
      $color-primary-light 0%,
      $color-primary 100%
    );
    border-color: $color-primary;
    color: $color-text-white;
    transform: translateY(-2px);
    box-shadow:
      0 6px 16px rgba($color-primary, 0.25),
      0 3px 6px rgba($color-primary, 0.15);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba($color-primary, 0.2),
      0 2px 4px rgba($color-primary, 0.1);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
}

// nav 버튼 (‹ › « ») 스타일
.nav-item .page-link {
  font-weight: $font-weight-semibold;
  font-size: $font-size-lg;
}

// 반응형 - 태블릿
@media (max-width: $breakpoint-md) {
  .pagination-wrapper {
    padding: $spacing-md 0;
  }

  .pagination {
    gap: 6px;
  }

  .page-link {
    min-width: 36px;
    height: 36px;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-sm;
  }
}

// 반응형 - 모바일
@media (max-width: $breakpoint-sm) {
  .pagination-wrapper {
    padding: $spacing-sm 0;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-border;
      border-radius: $radius-full;
    }
  }

  .pagination {
    gap: 4px;
    min-width: max-content;
  }

  .page-link {
    min-width: 32px;
    height: 32px;
    padding: $spacing-xs;
    font-size: $font-size-xs;
  }
}
</style>
