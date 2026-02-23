<template>
  <Teleport to="body">
    <Transition name="tooltip-fade">
      <div
        v-if="tooltipStore.visible"
        class="global-tooltip"
        :class="[tooltipStore.colorClass, `tooltip-${tooltipStore.position}`]"
        :style="tooltipStyle"
        role="tooltip"
      >
        <!-- 7-4: HTML 툴팁 지원 -->
        <div
          v-if="tooltipStore.isHtmlContent"
          class="tooltip-content"
          v-html="tooltipStore.displayContent"
        ></div>
        <div v-else class="tooltip-content">
          {{ tooltipStore.displayContent }}
        </div>

        <!-- 화살표 -->
        <div class="tooltip-arrow"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTooltipStore } from "@/stores/tooltipStore";

const tooltipStore = useTooltipStore();

const tooltipStyle = computed(() => {
  const offset = 8; // px
  let left = tooltipStore.x;
  let top = tooltipStore.y;

  switch (tooltipStore.position) {
    case "top":
      top -= offset;
      break;
    case "bottom":
      top += offset;
      break;
    case "left":
      left -= offset;
      break;
    case "right":
      left += offset;
      break;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
});
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

// ── 전역 툴팁 기본 스타일 ─────────────────────────────
.global-tooltip {
  position: fixed;
  z-index: $z-tooltip;
  pointer-events: none;
  background-color: rgba($color-bg-dark, 0.92);
  color: $color-text-white;
  font-size: $font-size-xs;
  line-height: $line-height-normal;
  padding: 0 $spacing-sm;
  border-radius: $radius-sm;
  box-shadow: $shadow-md;
  white-space: pre-line;
  max-width: 280px;
  word-wrap: break-word;

  // 7-4: HTML 툴팁 내부 요소 스타일 리셋
  .tooltip-content {
    // 기본 텍스트 스타일
    * {
      color: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    // 링크
    a {
      color: $color-primary-light;
      text-decoration: underline;

      &:hover {
        color: $color-primary;
      }
    }

    // 강조
    strong,
    b {
      font-weight: $font-weight-semibold;
    }

    em,
    i {
      font-style: italic;
    }

    // 코드
    code {
      background: rgba($color-bg-white, 0.15);
      padding: 1px 4px;
      border-radius: 2px;
      font-family: monospace;
      font-size: 11px;
    }
  }
}

// ── 위치별 변환 ──────────────────────────────────────
.global-tooltip.tooltip-top {
  transform: translate(-50%, -100%);
}

.global-tooltip.tooltip-bottom {
  transform: translate(-50%, 0%);
}

.global-tooltip.tooltip-left {
  transform: translate(-100%, -50%);
}

.global-tooltip.tooltip-right {
  transform: translate(0%, -50%);
}

// ── 화살표 ──────────────────────────────────────────
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.tooltip-top .tooltip-arrow {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: rgba($color-bg-dark, 0.92);
  border-bottom: none;
}

.tooltip-bottom .tooltip-arrow {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: rgba($color-bg-dark, 0.92);
  border-top: none;
}

.tooltip-left .tooltip-arrow {
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: rgba($color-bg-dark, 0.92);
  border-right: none;
}

.tooltip-right .tooltip-arrow {
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: rgba($color-bg-dark, 0.92);
  border-left: none;
}

// ── 색상 변형 ────────────────────────────────────────
.global-tooltip.tooltip-primary {
  background-color: rgba($color-primary, 0.95);

  .tooltip-top & .tooltip-arrow {
    border-top-color: rgba($color-primary, 0.95);
  }
  .tooltip-bottom & .tooltip-arrow {
    border-bottom-color: rgba($color-primary, 0.95);
  }
  .tooltip-left & .tooltip-arrow {
    border-left-color: rgba($color-primary, 0.95);
  }
  .tooltip-right & .tooltip-arrow {
    border-right-color: rgba($color-primary, 0.95);
  }
}

.global-tooltip.tooltip-danger {
  background-color: rgba($color-danger, 0.95);

  .tooltip-top & .tooltip-arrow {
    border-top-color: rgba($color-danger, 0.95);
  }
  .tooltip-bottom & .tooltip-arrow {
    border-bottom-color: rgba($color-danger, 0.95);
  }
  .tooltip-left & .tooltip-arrow {
    border-left-color: rgba($color-danger, 0.95);
  }
  .tooltip-right & .tooltip-arrow {
    border-right-color: rgba($color-danger, 0.95);
  }
}

.global-tooltip.tooltip-success {
  background-color: rgba($color-success, 0.95);

  .tooltip-top & .tooltip-arrow {
    border-top-color: rgba($color-success, 0.95);
  }
  .tooltip-bottom & .tooltip-arrow {
    border-bottom-color: rgba($color-success, 0.95);
  }
  .tooltip-left & .tooltip-arrow {
    border-left-color: rgba($color-success, 0.95);
  }
  .tooltip-right & .tooltip-arrow {
    border-right-color: rgba($color-success, 0.95);
  }
}

// ── 7-4: 툴팁 테이블 스타일 ──────────────────────────
.global-tooltip table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: $font-size-xs;

  th,
  td {
    padding: 3px 6px;
    text-align: left;
    border-bottom: 1px solid rgba($color-bg-white, 0.2);
  }

  th {
    font-weight: $font-weight-semibold;
    background-color: rgba($color-bg-white, 0.1);
    white-space: nowrap;
  }

  td {
    white-space: nowrap;
  }

  tr:last-child th,
  tr:last-child td {
    border-bottom: none;
  }

  // 숫자 컬럼 우측 정렬
  td.num,
  th.num {
    text-align: right;
  }

  // 구분선
  &.tooltip-table-bordered {
    th,
    td {
      border: 1px solid rgba($color-bg-white, 0.2);
    }
  }

  // 스트라이프 (교대 행 배경)
  &.tooltip-table-striped {
    tbody tr:nth-child(even) {
      background-color: rgba($color-bg-white, 0.05);
    }
  }
}

// ── Transition ───────────────────────────────────────
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity $transition-fast;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
