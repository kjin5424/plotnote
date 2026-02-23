<template>
  <div class="calendar-grid">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="calendar-loading">
      <div class="calendar-loading-spinner"></div>
    </div>

    <!-- 캘린더 그리드 -->
    <template v-else>
      <!-- 요일 헤더 -->
      <div class="calendar-weekdays">
        <div
          v-for="(weekday, index) in WEEKDAY_NAMES"
          :key="weekday"
          class="calendar-weekday"
          :class="{ weekend: index === 0 || index === 6 }"
        >
          {{ weekday }}
        </div>
      </div>

      <!-- 날짜 그리드 -->
      <div class="calendar-days">
        <div
          v-for="(dayData, index) in calendarDays"
          :key="`${dayData.date.getTime()}-${index}`"
          class="calendar-day"
          :class="{
            weekend: dayData.isWeekend,
            today: dayData.isToday,
            'other-month': dayData.isOtherMonth,
          }"
          @click="handleDayClick(dayData)"
          role="button"
          :tabindex="dayData.isOtherMonth ? -1 : 0"
        >
          <!-- 날짜 숫자 -->
          <div class="calendar-day-number">
            {{ dayData.dayNumber }}
          </div>

          <!-- 이벤트 목록 -->
          <div v-if="dayData.events.length > 0" class="calendar-events">
            <CalendarEvent
              v-for="event in getDisplayEvents(dayData.events)"
              :key="`${event.type}-${event.date}`"
              :event="event"
              @click="handleEventClick(event)"
            />

            <!-- 더보기 표시 -->
            <div
              v-if="getMoreEventsCount(dayData.events) > 0"
              class="calendar-more"
              @click.stop="handleDayClick(dayData)"
            >
              +{{ getMoreEventsCount(dayData.events) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="
    T extends {
      type: 'exam' | 'classroom';
      title: string;
      subtitle?: string;
      startTime?: string;
      endTime?: string;
      date: string;
    }
  "
>
import { computed } from "vue";
import CalendarEvent from "./CalendarEvent.vue";
import {
  getCalendarDates,
  isSameDay,
  isToday,
  isWeekend,
  WEEKDAY_NAMES,
} from "@/utils/calendarUtils";
import { formatDateISO } from "@/utils/dateFormatter";

/**
 * CalendarGrid Component
 * 캘린더 그리드 - 제네릭 타입으로 다양한 이벤트 데이터 지원
 */

interface DayData {
  date: Date;
  dayNumber: number;
  isToday: boolean;
  isWeekend: boolean;
  isOtherMonth: boolean;
  events: T[];
}

interface Props {
  /** 현재 년도 */
  year: number;
  /** 현재 월 (1-12) */
  month: number;
  /** 이벤트 목록 */
  events: T[];
  /** 로딩 상태 */
  loading?: boolean;
  /** 최대 표시 이벤트 개수 */
  maxDisplayEvents?: number;
}

interface Emits {
  (e: "day-click", date: Date): void;
  (e: "event-click", event: T): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  maxDisplayEvents: 2,
});

const emit = defineEmits<Emits>();

/**
 * 캘린더 그리드에 표시할 날짜 배열
 */
const calendarDays = computed((): DayData[] => {
  const dates = getCalendarDates(props.year, props.month);
  const currentMonth = props.month;

  return dates.map((date) => {
    const dateStr = formatDateISO(date);
    const isOtherMonth = date.getMonth() + 1 !== currentMonth;

    // 해당 날짜의 이벤트 필터링
    const dayEvents = props.events.filter((event) => event.date === dateStr);

    return {
      date,
      dayNumber: date.getDate(),
      isToday: isToday(date),
      isWeekend: isWeekend(date),
      isOtherMonth,
      events: dayEvents,
    };
  });
});

const handleDayClick = (dayData: DayData) => {
  if (!dayData.isOtherMonth) {
    emit("day-click", dayData.date);
  }
};

const handleEventClick = (event: T) => {
  emit("event-click", event);
};

const getDisplayEvents = (events: T[]): T[] => {
  return events.slice(0, props.maxDisplayEvents);
};

const getMoreEventsCount = (events: T[]): number => {
  return events.length > props.maxDisplayEvents
    ? events.length - props.maxDisplayEvents
    : 0;
};
</script>
