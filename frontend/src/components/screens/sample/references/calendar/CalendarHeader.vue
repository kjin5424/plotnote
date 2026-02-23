<template>
  <div class="calendar-header">
    <div class="calendar-nav">
      <button
        class="calendar-nav-btn"
        type="button"
        @click="handlePrevMonth"
        aria-label="이전 달"
      >
        ◀
      </button>

      <h3 class="calendar-title">{{ displayTitle }}</h3>

      <button
        class="calendar-nav-btn"
        type="button"
        @click="handleNextMonth"
        aria-label="다음 달"
      >
        ▶
      </button>

      <button class="calendar-today-btn" type="button" @click="handleGoToday">
        오늘
      </button>
    </div>

    <div v-if="showFilters" class="calendar-filters">
      <!-- 시험 필터 -->
      <div class="calendar-filter-item">
        <label class="toggle-button">
          <input type="checkbox" />
          <span
            class="toggle-switch"
            :class="{ checked: showExams }"
            role="switch"
            :aria-checked="showExams"
            tabindex="0"
            @click="toggleExams"
            @keydown.enter="toggleExams"
            @keydown.space.prevent="toggleExams"
          >
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">시험</span>
        </label>
      </div>

      <!-- 강의실 필터 -->
      <div class="calendar-filter-item">
        <label class="toggle-button">
          <input type="checkbox" />
          <span
            class="toggle-switch"
            :class="{ checked: showClassrooms }"
            role="switch"
            :aria-checked="showClassrooms"
            tabindex="0"
            @click="toggleClassrooms"
            @keydown.enter="toggleClassrooms"
            @keydown.space.prevent="toggleClassrooms"
          >
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">강의실</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
/**
 * CalendarHeader Component
 * 캘린더 헤더 - 네비게이션과 필터를 제공하는 공통 컴포넌트
 */

interface Props {
  /** 현재 년도 */
  year: number;
  /** 현재 월 (1-12) */
  month: number;
  /** 시험 표시 여부 */
  showExams?: boolean;
  /** 강의실 표시 여부 */
  showClassrooms?: boolean;
  /** 필터 표시 여부 */
  showFilters?: boolean;
}

interface Emits {
  (e: "prev-month"): void;
  (e: "next-month"): void;
  (e: "go-today"): void;
  (e: "update:show-exams", value: boolean): void;
  (e: "update:show-classrooms", value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  showExams: true,
  showClassrooms: true,
  showFilters: true,
});

const emit = defineEmits<Emits>();

const displayTitle = computed(() => `${props.year}년 ${props.month}월`);

const handlePrevMonth = () => emit("prev-month");
const handleNextMonth = () => emit("next-month");
const handleGoToday = () => emit("go-today");
const toggleExams = () => emit("update:show-exams", !props.showExams);
const toggleClassrooms = () =>
  emit("update:show-classrooms", !props.showClassrooms);
</script>
