// ============================================================
//  hooks/ui/useTooltip.ts  (tooltipDirectives.ts의 React 버전)
//  Vue의 v-tooltip 디렉티브 → React 커스텀 훅으로 대체.
//
//  사용법:
//    // 1. 단순 텍스트
//    const tooltip = useTooltip("저장하기", "top");
//    <button {...tooltip.triggerProps}>저장</button>
//
//    // 2. HTML 내용
//    const tooltip = useTooltip({ html: "<b>제목</b><br/>설명", isHtml: true }, "bottom");
//    <button {...tooltip.triggerProps}>버튼</button>
//
//    // 3. 색상 변형
//    const tooltip = useTooltip("삭제", "top", "danger");
//    <button {...tooltip.triggerProps}>삭제</button>
// ============================================================

import { useCallback } from "react";
import {
  useTooltipStore,
  type TooltipPosition,
  type TooltipContent,
} from "@/contexts/TooltipContext";

// Vue의 parseModifiers에 해당 (React는 prop으로 명시적으로 받음)
const VALID_POSITIONS = new Set<string>(["top", "bottom", "left", "right"]);
const VALID_COLORS = new Set<string>(["primary", "danger", "success"]);

function normalizePosition(pos: string): TooltipPosition {
  return VALID_POSITIONS.has(pos) ? (pos as TooltipPosition) : "top";
}

function normalizeColor(color: string): string {
  return VALID_COLORS.has(color) ? `tooltip-${color}` : "";
}

// Vue의 getCoordinates에 해당
function getCoordinates(rect: DOMRect, position: TooltipPosition) {
  switch (position) {
    case "bottom":
      return { x: rect.left + rect.width / 2, y: rect.bottom };
    case "left":
      return { x: rect.left, y: rect.top + rect.height / 2 };
    case "right":
      return { x: rect.right, y: rect.top + rect.height / 2 };
    case "top":
    default:
      return { x: rect.left + rect.width / 2, y: rect.top };
  }
}

// ── 메인 훅
export function useTooltip(
  content: string | TooltipContent,
  position: TooltipPosition | string = "top",
  color: string = ""
) {
  const { show, hide } = useTooltipStore();

  const normalizedPosition = normalizePosition(position);
  const colorClass = normalizeColor(color);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { x, y } = getCoordinates(rect, normalizedPosition);
      show(content, x, y, colorClass, normalizedPosition);
    },
    [content, normalizedPosition, colorClass, show]
  );

  const handleHide = useCallback(() => {
    hide();
  }, [hide]);

  // 대상 엘리먼트에 spread하는 props 반환
  // Vue의 el.addEventListener와 동일한 역할
  return {
    triggerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleHide,
      onClick: handleHide,        // 클릭 시 닫기 (directive와 동일)
    },
  };
}

// ── 단순 data-attribute 전용 (CSS만 쓰는 케이스에서 타입 힌트용)
//    tooltip.scss의 [data-tooltip] CSS와 함께 사용
//    JS 인프라가 필요없는 초단순 경우에만 사용
export function useSimpleTooltip(text: string, position: TooltipPosition = "top") {
  return {
    "data-tooltip": text,
    "data-tooltip-pos": position,
  };
}
