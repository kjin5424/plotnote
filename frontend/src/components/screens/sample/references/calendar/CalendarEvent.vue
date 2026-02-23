<template>
  <div
    class="calendar-event"
    :class="`calendar-event-${event.type}`"
    :title="`${event.title}${event.subtitle ? ' - ' + event.subtitle : ''}`"
    @click="handleClick"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="calendar-event-title">{{ event.title }}</div>
    <div v-if="event.subtitle" class="calendar-event-subtitle">
      {{ event.subtitle }}
    </div>
    <div v-if="event.startTime && event.endTime" class="calendar-event-time">
      {{ event.startTime }}-{{ event.endTime }}
    </div>
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
    }
  "
>
/**
 * CalendarEvent Component
 * 캘린더 이벤트 표시 - 제네릭 타입으로 다양한 이벤트 데이터 지원
 */

interface Props {
  /** 이벤트 데이터 */
  event: T;
}

interface Emits {
  (e: "click", event: T): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = (e: Event) => {
  e.stopPropagation();
  emit("click", props.event);
};
</script>
