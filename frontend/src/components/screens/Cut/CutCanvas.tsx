import { useState, useRef, useCallback } from "react";
import { useCut } from "hooks/data/useCut";
import {
  classifySplitAngle,
  getSnapLine,
  getDiagonalLine,
} from "utils/helpers/layoutUtils";

// 빈 페이지일 때 가상 전체 영역
const FULL_PAGE = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

// [x,y][] → SVG points 문자열
const toPoints = (verts) => verts.map((v) => `${v[0]},${v[1]}`).join(" ");

// 폴리곤 중심점 (라벨 위치)
const centroid = (verts) => {
  const x = verts.reduce((s, v) => s + v[0], 0) / verts.length;
  const y = verts.reduce((s, v) => s + v[1], 0) / verts.length;
  return { x, y };
};

// 드래그 상태에서 미리보기 선 계산
const calcPreview = (drag) => {
  if (!drag) return null;
  const { startX, startY, endX, endY } = drag;
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;

  const type = classifySplitAngle(dx, dy);
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  if (type === "horizontal") {
    const [l1, l2] = getSnapLine("horizontal", midX, midY);
    return { l1, l2, type };
  }
  if (type === "vertical") {
    const [l1, l2] = getSnapLine("vertical", midX, midY);
    return { l1, l2, type };
  }
  const line = getDiagonalLine(startX, startY, endX, endY);
  if (!line) return null;
  return { l1: line[0], l2: line[1], type };
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CutCanvas
// - SVG 기반 컷 렌더링
// - 드래그로 컷 분할 (수평/수직/대각선 스냅)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function CutCanvas({ page }) {
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null); // { startX, startY, endX, endY, cutId }
  const { cutList, currentCutId, selectCut, splitCut } = useCut(page.pageId);

  // 마우스 이벤트 → SVG 0-100 좌표 변환
  const toSVGCoords = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }, []);

  const handleMouseDown = useCallback(
    (e, cutId) => {
      e.preventDefault();
      const { x, y } = toSVGCoords(e);
      setDrag({ startX: x, startY: y, endX: x, endY: y, cutId });
    },
    [toSVGCoords],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!drag) return;
      const { x, y } = toSVGCoords(e);
      setDrag((prev) => ({ ...prev, endX: x, endY: y }));
    },
    [drag, toSVGCoords],
  );

  const handleMouseUp = useCallback(() => {
    if (!drag) return;
    const { startX, startY, endX, endY, cutId } = drag;
    const dx = endX - startX;
    const dy = endY - startY;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len < 3) {
      // 짧은 클릭 → 컷 선택
      if (cutId) selectCut(cutId);
    } else {
      // 드래그 → 컷 분할
      splitCut(cutId, { startX, startY, endX, endY });
    }
    setDrag(null);
  }, [drag, selectCut, splitCut]);

  const preview = calcPreview(drag);
  const isEmpty = cutList.length === 0;

  return (
    <div className="cut-canvas">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="cut-canvas-svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 컷 사이 gap 색상: 이 배경이 stroke 사이로 보임 */}
        <rect className="cut-canvas-bg" x="0" y="0" width="100" height="100" />

        {/* 빈 페이지: 파란계열 테두리로 전체 영역 표시 */}
        {isEmpty && (
          <polygon
            points={toPoints(FULL_PAGE)}
            className="cut-polygon cut-polygon--empty"
            onMouseDown={(e) => handleMouseDown(e, null)}
          />
        )}

        {/* 컷 목록 렌더링: gap layer + border layer 두 겹 */}
        {cutList.map((cut, idx) => {
          const verts = cut.vertices || FULL_PAGE;
          const c = centroid(verts);
          const isSelected = cut.cutId === currentCutId;
          const pts = toPoints(verts);
          return (
            <g key={cut.cutId}>
              {/* gap layer: 흰 fill + 배경색 stroke (paint-order로 stroke가 외부에만 표시)
                  → 인접 컷 사이에 배경색 gap 생성 */}
              <polygon
                points={pts}
                className={`cut-polygon${isSelected ? " cut-polygon--selected" : ""}`}
                onMouseDown={(e) => handleMouseDown(e, cut.cutId)}
                onClick={() => selectCut(cut.cutId)}
              />
              {/* border layer: 검정 윤곽선, 이벤트 없음 */}
              <polygon
                points={pts}
                className={`cut-polygon-border${isSelected ? " cut-polygon-border--selected" : ""}`}
              />
              {/* 컷 번호 라벨 */}
              <text
                x={c.x}
                y={c.y}
                className="cut-label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {idx + 1}
              </text>
            </g>
          );
        })}

        {/* 분할선 미리보기 */}
        {preview && (
          <line
            x1={preview.l1[0]}
            y1={preview.l1[1]}
            x2={preview.l2[0]}
            y2={preview.l2[1]}
            className={`cut-preview-line cut-preview-line--${preview.type}`}
          />
        )}
      </svg>
    </div>
  );
}
