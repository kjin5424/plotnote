// ============================================================
//  components/common/Tooltip/Tooltip.jsx  (Tooltip.vue의 React 버전)
//  React Portal로 document.body에 직접 렌더링 →
//  z-index, overflow:hidden 문제 없이 항상 최상단 표시.
//
//  App.jsx 최상위에 <Tooltip /> 한 번만 배치하면 됨.
//  실제 표시/숨김은 TooltipContext가 전담.
// ============================================================

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useTooltipStore } from "@/contexts/TooltipContext";

// 툴팁 화살표 offset (tooltip.scss의 $tooltip-offset과 동일값)
const OFFSET = 8;
// 뷰포트 여백 (가장자리 감지)
const VIEWPORT_MARGIN = 8;

export default function Tooltip() {
  const { state, isHtmlContent, displayContent } = useTooltipStore();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  // 위치 계산 — 뷰포트 경계 감지 포함
  useEffect(() => {
    if (!state.visible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const { width, height } = tooltip.getBoundingClientRect();
    const { x, y, position } = state;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (position) {
      case "bottom":
        top = y + OFFSET;
        left = x - width / 2;
        break;
      case "left":
        top = y - height / 2;
        left = x - width - OFFSET;
        break;
      case "right":
        top = y - height / 2;
        left = x + OFFSET;
        break;
      case "top":
      default:
        top = y - height - OFFSET;
        left = x - width / 2;
        break;
    }

    // 뷰포트 경계 보정 (CSS만으론 불가능한 부분 — JS 필요)
    left = Math.max(VIEWPORT_MARGIN, Math.min(left, vw - width - VIEWPORT_MARGIN));
    top  = Math.max(VIEWPORT_MARGIN, Math.min(top,  vh - height - VIEWPORT_MARGIN));

    setStyle({
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1000,
    });
  }, [state.visible, state.x, state.y, state.position]);

  if (!state.visible) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      role="tooltip"
      className={[
        "tooltip-portal",
        `tooltip-portal--${state.position}`,
        state.colorClass,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {isHtmlContent ? (
        // HTML 내용 (dangerouslySetInnerHTML 사용 — 신뢰 가능한 내부 데이터만)
        <div
          className="tooltip-portal__inner"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      ) : (
        <div className="tooltip-portal__inner">{displayContent}</div>
      )}
    </div>,
    document.body
  );
}
