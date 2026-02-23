<template>
  <div class="sample-container">
    <header :class="['integrated-header', { 'is-pinned': isPinned }]">
      <div class="header-inner">
        <nav class="gnb">
          <div
            v-for="group in menuGroups"
            :key="group.title"
            class="gnb-item"
            @mouseenter="hoveredGroup = group.title"
            @mouseleave="hoveredGroup = null"
          >
            <div :class="['group-title', { active: isGroupActive(group) }]">
              {{ group.title }}
            </div>

            <div
              class="sub-menu-container"
              :class="{ show: isPinned || hoveredGroup === group.title }"
            >
              <ul class="sub-list">
                <li
                  v-for="item in group.items"
                  :key="item.id"
                  :class="['sub-item', { active: activeTab === item.id }]"
                  @click="activeTab = item.id"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="side-actions">
          <button
            @click="isPinned = !isPinned"
            :class="['pin-btn', { active: isPinned }]"
          >
            {{ isPinned ? "📌 고정 해제" : "📍 메뉴 고정" }}
          </button>
        </div>
      </div>
    </header>

    <main class="content-area" :class="{ 'is-pushed': isPinned }">
      <!-- CSS -->
      <VariablesTab v-if="activeTab === 'variables'" />
      <UtilityTab v-if="activeTab === 'utility'" />
      <ComponentsTab v-if="activeTab === 'components'" />
      <ButtonTab v-if="activeTab === 'button'" />
      <TableTab v-if="activeTab === 'table'" />
      <!-- Common -->
      <PageHeaderTab v-if="activeTab === 'pageheader'" />
      <TooltipTab v-if="activeTab === 'tooltip'" />
      <LoadingTab v-if="activeTab === 'loading'" />
      <ModalTab v-if="activeTab === 'modal'" />
      <PaginationTab v-if="activeTab === 'pagination'" />
      <SearchBarTab v-if="activeTab === 'searchbar'" />
      <FileUploadTab v-if="activeTab === 'fileupload'" />
      <CustomSelectTab v-if="activeTab === 'customselect'" />
      <CalendarTab v-if="activeTab === 'calendar'" />
      <!-- Config/Hooks -->
      <AxiosConfigTab v-if="activeTab === 'axiosConfig'" />
      <UseNotificationTab v-if="activeTab === 'useNotification'" />
      <UsePaginationTab v-if="activeTab === 'usePagination'" />
      <UseConfigTab v-if="activeTab === 'useConfig'" />
      <UseFormTab v-if="activeTab === 'useForm'" />
      <UseFileUploadTab v-if="activeTab === 'useFileUpload'" />
      <UseTablesTab v-if="activeTab === 'useTables'" />
      <!-- Utils -->
      <ArrayHelperTab v-if="activeTab === 'arrayHelper'" />
      <DateFormatterTab v-if="activeTab === 'dateFormatter'" />
      <ValidatorTab v-if="activeTab === 'validator'" />
      <FileHelperTab v-if="activeTab === 'fileHelper'" />
      <!-- Stores -->
      <AuthStoreTab v-if="activeTab === 'authStore'" />
      <CommonStoreTab v-if="activeTab === 'commonStore'" />
      <ModalStoreTab v-if="activeTab === 'modalStore'" />
      <TooltipTab v-if="activeTab === 'tootipStore'" />
      <!-- Constants -->
      <CommonConstantsTab v-if="activeTab === 'commonConstants'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// CSS
import VariablesTab from "./VariablesTab.vue";
import UtilityTab from "./UtilityTab.vue";
import ComponentsTab from "./ComponentsTab.vue";
import ButtonTab from "./ButtonTab.vue";
import TableTab from "./TableTab.vue";
// Common
import PageHeaderTab from "./PageHeaderTab.vue";
import TooltipTab from "./TooltipTab.vue";
import LoadingTab from "./LoadingTab.vue";
import ModalTab from "./ModalTab.vue";
import PaginationTab from "./PaginationTab.vue";
import SearchBarTab from "./SearchBarTab.vue";
import FileUploadTab from "./FileUploadTab.vue";
import CustomSelectTab from "./CustomSelectTab.vue";
import CalendarTab from "./CalendarTab.vue";
// Config/Hooks
import AxiosConfigTab from "./AxiosConfigTab.vue";
import UseNotificationTab from "./UseNotificationTab.vue";
import UsePaginationTab from "./UsePaginationTab.vue";
import UseConfigTab from "./UseConfigTab.vue";
import UseFormTab from "./UseFormTab.vue";
import UseFileUploadTab from "./UseFileUploadTab.vue";
import UseTablesTab from "./UseTablesTab.vue";
// Utils
import ArrayHelperTab from "./ArrayHelperTab.vue";
import DateFormatterTab from "./DateFormatterTab.vue";
import ValidatorTab from "./ValidatorTab.vue";
import FileHelperTab from "./FileHelperTab.vue";
// Stores
import AuthStoreTab from "./AuthStoreTab.vue";
import CommonStoreTab from "./CommonStoreTab.vue";
import ModalStoreTab from "./ModalStoreTab.vue";
// Constants
import CommonConstantsTab from "./CommonConstantsTab.vue";

const menuGroups = [
  {
    title: "CSS",
    items: [
      { id: "variables", label: "Variables" },
      { id: "utility", label: "Utility" },
      { id: "components", label: "Components" },
      { id: "button", label: "Button" },
      { id: "table", label: "Table" },
    ],
  },
  {
    title: "Common",
    items: [
      { id: "pageheader", label: "PageHeader" },
      { id: "tooltip", label: "Tooltip" },
      { id: "loading", label: "Loading" },
      { id: "modal", label: "Modal" },
      { id: "pagination", label: "Pagination" },
      { id: "searchbar", label: "SearchBar" },
      { id: "fileupload", label: "FileUpload" },
      { id: "customselect", label: "CustomSelect" },
      { id: "calendar", label: "Calendar" },
    ],
  },
  {
    title: "Config/Hooks",
    items: [
      { id: "axiosConfig", label: "Axios Config" },
      { id: "useNotification", label: "useNotification" },
      { id: "usePagination", label: "usePagination" },
      { id: "useConfig", label: "useConfig" },
      { id: "useForm", label: "useForm" },
      { id: "useFileUpload", label: "useFileUpload" },
      { id: "useTables", label: "useTables" },
    ],
  },
  {
    title: "Utils",
    items: [
      { id: "arrayHelper", label: "arrayHelper" },
      { id: "dateFormatter", label: "DateFormatter" },
      { id: "validator", label: "Validator" },
      { id: "fileHelper", label: "fileHelper" },
    ],
  },
  {
    title: "Stores",
    items: [
      { id: "authStore", label: "authStore" },
      { id: "commonStore", label: "commonStore" },
      { id: "modalStore", label: "modalStore" },
    ],
  },
  {
    title: "Constants",
    items: [{ id: "commonConstants", label: "commonConstants" }],
  },
];

const isPinned = ref(false);
const hoveredGroup = ref<string | null>(null);
const activeTab = ref("variables");

const isGroupActive = (group: any) =>
  group.items.some((item: any) => item.id === activeTab.value);
</script>

<style scoped lang="scss">
.sample-container {
  position: relative;
  min-height: 100vh;
}

.integrated-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 40px;
  transition:
    background 0.2s ease,
    backdrop-filter 0.2s ease;

  &.is-pinned {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.gnb {
  display: flex;
  flex: 1;
}

.gnb-item {
  width: 180px;
  position: relative;
}

.group-title {
  height: 64px;
  display: flex;
  align-items: center;
  font-weight: 800;
  color: #333;
  cursor: pointer;
  padding: 0 16px;
  &.active {
    color: $color-primary;
  }
}

.sub-menu-container {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
  transform: translateY(-5px);

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .integrated-header.is-pinned & {
    transition: none !important;
    opacity: 1;
    visibility: visible;
    transform: none;
    position: relative;
    top: auto;
    left: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0 0 20px 0;
  }

  .integrated-header:not(.is-pinned) & {
    position: absolute;
    top: 64px;
    left: 0;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
    min-width: 100%;
    z-index: 2001;
  }
}

.sub-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sub-item {
  padding: 10px 16px;
  margin: 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: left;

  &:hover {
    background-color: $color-secondary;
    color: $color-primary;
    padding-left: 8px;
  }

  &.active {
    background-color: $color-primary !important;
    color: #fff !important;
    font-weight: 600;
  }
}

.side-actions {
  height: 64px;
  display: flex;
  align-items: center;
}

.pin-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &.active {
    background: $color-primary;
    color: #fff;
    border-color: $color-primary;
  }
}

.content-area {
  padding: 104px 40px 40px;
  max-width: 1400px;
  margin: 0 auto;
  transition: padding 0.2s ease;

  // 메뉴 고정 시 본문 상단 여백 추가 (필요 시)
  &.is-pushed {
    // padding-top: 300px; // 하위 메뉴 높이에 맞춰 자동 조절되게 하거나 고정값 부여
  }
}

/* ── 섹션 구조 ─────────────────────────────────────────────── */
:deep(.section-title) {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}

:deep(.section-desc) {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-3xl;
  line-height: 1.7;
}

:deep(.style-section) {
  margin-bottom: $spacing-3xl;
}

:deep(.subsection-title) {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

:deep(.description) {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
  line-height: 1.6;
}

/* ── 데모 박스 ─────────────────────────────────────────────── */
:deep(.demo-box) {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
  overflow-x: auto;
}

:deep(.demo-label) {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-secondary;
  margin-bottom: $spacing-sm;
}

/* ── 코드 설명 박스 ────────────────────────────────────────── */
:deep(.code-explanation) {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;

  h4 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
  }

  h5 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin: $spacing-lg 0 $spacing-sm 0;
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-md 0;
    font-size: $font-size-sm;
    line-height: 1.6;

    code {
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      white-space: pre;
    }
  }
}

/* ── 클래스 가이드 (코드 설명 박스 내부) ──────────────────── */
:deep(.class-guide) {
  margin-top: $spacing-lg;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-sm;

  h5 {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: $spacing-xs 0;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: 1.6;

      em {
        color: $color-text-light;
        font-style: normal;
        margin-left: 2px;
      }

      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 3px 8px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        font-family: "Consolas", "Monaco", "Courier New", monospace;
        margin-right: $spacing-xs;
      }
    }
  }

  pre {
    background: #f3f4f6;
    color: #1f2937;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    margin: 8px 0;
    font-family: "Consolas", monospace;
    overflow-x: auto;
  }
}

/* ── 인라인 코드 (description, section-desc 내) ───────────── */
:deep(.description code),
:deep(.section-desc code) {
  background: #e3f2fd;
  color: #1565c0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: $font-size-sm;
  font-family: "Consolas", monospace;
}
</style>
