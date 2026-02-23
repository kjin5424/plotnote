import { ref, computed } from "vue";

/**
 * 캘린더 공통 훅
 * 캘린더를 사용하는 모든 곳에서 공통으로 사용할 수 있는 로직
 */

export interface UseCalendarOptions {
  /** 초기 년도 */
  initialYear?: number;
  /** 초기 월 */
  initialMonth?: number;
}

export const useCalendar = (options: UseCalendarOptions = {}) => {
  const today = new Date();

  const currentYear = ref<number>(options.initialYear || today.getFullYear());
  const currentMonth = ref<number>(
    options.initialMonth || today.getMonth() + 1,
  );

  /**
   * 현재 년월을 표시 형식으로 변환
   */
  const displayDate = computed(() => {
    return `${currentYear.value}년 ${currentMonth.value}월`;
  });

  /**
   * 이전 달로 이동
   */
  const prevMonth = () => {
    if (currentMonth.value === 1) {
      currentYear.value--;
      currentMonth.value = 12;
    } else {
      currentMonth.value--;
    }
  };

  /**
   * 다음 달로 이동
   */
  const nextMonth = () => {
    if (currentMonth.value === 12) {
      currentYear.value++;
      currentMonth.value = 1;
    } else {
      currentMonth.value++;
    }
  };

  /**
   * 오늘로 이동
   */
  const goToday = () => {
    const now = new Date();
    currentYear.value = now.getFullYear();
    currentMonth.value = now.getMonth() + 1;
  };

  /**
   * 특정 날짜로 이동
   */
  const goToDate = (date: Date) => {
    currentYear.value = date.getFullYear();
    currentMonth.value = date.getMonth() + 1;
  };

  return {
    currentYear,
    currentMonth,
    displayDate,
    prevMonth,
    nextMonth,
    goToday,
    goToDate,
  };
};
