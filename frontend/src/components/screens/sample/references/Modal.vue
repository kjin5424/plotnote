<template>
  <div class="modal-overlay" @mousedown.self="handleOverlayClick">
    <div class="modal-container" :class="modalSizeClass">
      <!-- Modal Header -->
      <div class="modal-header" v-if="title || $slots.header">
        <slot name="header">
          <h3 class="modal-title">{{ title }}</h3>
        </slot>
        <button
          v-if="showClose"
          class="modal-close-btn"
          @click="handleClose"
          aria-label="닫기"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body" :class="{ 'has-footer': hasFooter }">
        <slot></slot>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer" v-if="hasFooter">
        <slot name="footer">
          <div class="modal-footer-actions">
            <button
              v-if="showConfirmButton"
              class="btn"
              :class="confirmButtonClass"
              @click="handleConfirm"
              :disabled="confirmDisabled"
            >
              {{ confirmText }}
            </button>
            <button
              v-if="showCancelButton"
              class="btn btn-dark"
              @click="handleCancel"
            >
              {{ cancelText }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { closeModal } from "jenesius-vue-modal";

// Props 정의
interface Props {
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  closeOnOverlay?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmType?: "primary" | "success" | "danger";
  confirmDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  size: "md",
  showClose: true,
  closeOnOverlay: true,
  showCancelButton: true,
  showConfirmButton: true,
  cancelText: "취소",
  confirmText: "확인",
  confirmType: "primary",
  confirmDisabled: false,
});

// Emits 정의
const emit = defineEmits<{
  confirm: [];
  cancel: [];
  close: [];
}>();

// Slots 확인
const slots = defineSlots();
const hasFooter = computed(() => {
  return slots.footer || props.showCancelButton || props.showConfirmButton;
});

// 모달 크기 클래스
const modalSizeClass = computed(() => {
  return `modal-${props.size}`;
});

// 확인 버튼 클래스
const confirmButtonClass = computed(() => {
  switch (props.confirmType) {
    case "success":
      return "btn-success";
    case "danger":
      return "btn-danger";
    case "primary":
    default:
      return "btn-primary";
  }
});

// 오버레이 클릭 처리
const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose();
  }
};

// 닫기 처리
const handleClose = () => {
  emit("close");
  closeModal();
};

// 취소 처리
const handleCancel = () => {
  emit("cancel");
  closeModal();
};

// 확인 처리
const handleConfirm = () => {
  emit("confirm");
};

// ESC 키 처리
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped lang="scss">
// Modal Overlay
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
  animation: fadeIn 0.2s ease-in-out;
  width: 100vw;
  height: 100vh;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Modal Container
.modal-container {
  display: flex;
  flex-direction: column;
  background-color: $color-bg-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
  height: fit-content;
  max-height: 80vh;
  width: 100%;
  animation: slideUp 0.3s ease-out;
  padding: $spacing-md $spacing-lg;
  position: relative;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// Modal Sizes
.modal-sm {
  max-width: 400px;
}

.modal-md {
  max-width: 600px;
}

.modal-lg {
  max-width: 800px;
}

.modal-xl {
  max-width: 1000px;
}

.modal-full {
  max-width: 95vw;
  max-height: 95vh;
}

// Modal Header
.modal-header {
  display: flex;
  justify-content: center;
  padding: $spacing-xl;
  border-bottom: $border-width solid $color-border-light;
  flex-shrink: 0;
  width: 100%;
  position: relative;
}

.modal-title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin: 0;
  margin-top: 10px;
}

.modal-close-btn {
  position: absolute;
  right: $spacing-lg;
  background: transparent;
  border: none;
  color: $color-text-secondary;
  cursor: pointer;
  font-size: $font-size-xl;
  padding: $spacing-xs;
  line-height: 1;
  transition: all $transition-fast;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  &:hover {
    background-color: $color-bg-gray;
    color: $color-text-primary;
  }

  &:active {
    transform: scale(0.95);
  }
}

// Modal Body
.modal-body {
  padding: $spacing-xl;
  overflow-y: auto;
  flex: 1;
  width: 100%;

  &.has-footer {
    border-bottom: $border-width solid $color-border-light;
  }
}

// Modal Footer
.modal-footer {
  padding: $spacing-lg $spacing-xl;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.modal-footer-actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: $spacing-md;
}

:slotted(.modal-footer-actions) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
}

// Responsive
@media (max-width: $breakpoint-md) {
  .modal-overlay {
    padding: $spacing-md;
  }

  .modal-container {
    max-height: 95vh;
  }

  .modal-md,
  .modal-lg,
  .modal-xl {
    max-width: 100%;
  }

  .modal-header {
    padding: $spacing-lg;
  }

  .modal-body {
    padding: $spacing-lg;
  }

  .modal-footer {
    padding: $spacing-md $spacing-lg;
  }

  .modal-footer-actions {
    flex-direction: column-reverse;
    width: 100%;

    .btn {
      width: 100%;
    }
  }
}

// Scrollbar 스타일 (modal-body용)
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: $color-bg-gray;
  border-radius: $radius-md;
}

.modal-body::-webkit-scrollbar-thumb {
  background: $color-gray-400;
  border-radius: $radius-md;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: $color-gray-600;
}
</style>
