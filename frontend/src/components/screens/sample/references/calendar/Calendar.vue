<template>
  <div class="calendar-container">
    <!-- 캘린더 헤더 -->
    <CalendarHeader
      :year="currentYear"
      :month="currentMonth"
      :show-exams="showExams"
      :show-classrooms="showClassrooms"
      @prev-month="handlePrevMonth"
      @next-month="handleNextMonth"
      @go-today="handleGoToday"
      @update:show-exams="showExams = $event"
      @update:show-classrooms="showClassrooms = $event"
    />

    <!-- 캘린더 그리드 -->
    <CalendarGrid
      :year="currentYear"
      :month="currentMonth"
      :events="events"
      :show-exams="showExams"
      :show-classrooms="showClassrooms"
      :loading="loading"
      @day-click="handleDayClick"
      @event-click="handleEventClick"
    />
  </div>
</template>

<script setup lang="ts">
import "@/assets/styles/calendar.scss";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarGrid from "./CalendarGrid.vue";

interface Props {
  /** 초기 년도 */
  initialYear?: number;
  /** 초기 월 */
  initialMonth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialYear: () => new Date().getFullYear(),
  initialMonth: () => new Date().getMonth() + 1,
});

const router = useRouter();

// State
const currentYear = ref<number>(props.initialYear);
const currentMonth = ref<number>(props.initialMonth);
const events = ref<CalendarEvent[]>([]);
const showExams = ref<boolean>(true);
const showClassrooms = ref<boolean>(true);
const loading = ref<boolean>(false);

/**
 * 이벤트 데이터 로드
 */
const loadEvents = async () => {
  loading.value = true;

  try {
    const fetchedEvents = await fetchAllCalendarEvents({
      year: currentYear.value,
      month: currentMonth.value,
    });

    events.value = fetchedEvents;
  } catch (error) {
    console.error("Failed to load calendar events:", error);
    events.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * 이전 달로 이동
 */
const handlePrevMonth = () => {
  if (currentMonth.value === 1) {
    currentYear.value--;
    currentMonth.value = 12;
  } else {
    currentMonth.value--;
  }
  loadEvents();
};

/**
 * 다음 달로 이동
 */
const handleNextMonth = () => {
  if (currentMonth.value === 12) {
    currentYear.value++;
    currentMonth.value = 1;
  } else {
    currentMonth.value++;
  }
  loadEvents();
};

/**
 * 오늘 날짜로 이동
 */
const handleGoToday = () => {
  const today = new Date();
  currentYear.value = today.getFullYear();
  currentMonth.value = today.getMonth() + 1;
  loadEvents();
};

/**
 * 이벤트 클릭 - 해당 페이지로 이동
 */
const handleEventClick = (event: CalendarEvent) => {
  router.push(event.link);
};

/**
 * 날짜 셀 클릭 (현재는 사용하지 않음)
 */
const handleDayClick = (date: Date) => {
  console.log("Day clicked:", date);
  // 필요 시 날짜 클릭 시 동작 추가
};

// 컴포넌트 마운트 시 이벤트 로드
onMounted(() => {
  loadEvents();
});
</script>
