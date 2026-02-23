<template>
  <Transition name="loading-fade">
    <div
      v-if="commonStore.isLoading"
      class="loading-overlay"
      @click.self="handleOverlayClick"
    >
      <div class="loading-spinner"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/commonStore";

const commonStore = useCommonStore();
/**
 * 오버레이 클릭 처리
 * 기본적으로 로딩 중에는 클릭을 무시하지만,
 * 필요시 이 함수를 수정하여 동작을 추가할 수 있습니다.
 */
const handleOverlayClick = () => {
  // 로딩 중에는 오버레이 클릭 무시
  return;
};
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Transition 애니메이션
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.2s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
