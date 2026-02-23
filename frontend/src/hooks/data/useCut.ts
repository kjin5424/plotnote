import { useCallback } from "react";
import useData from "contexts/DataContext";
import { generateCutId } from "utils/helpers/idGenerator";
import { addToOrder, removeFromOrder } from "utils/helpers/orderManager";
import {
  classifySplitAngle,
  splitPolygon,
  getSnapLine,
  getDiagonalLine,
} from "utils/helpers/layoutUtils";
import type { Cut, Vertex } from "types/models";

// 컷이 없을 때 사용하는 전체 페이지 영역 (0-100 좌표계)
const FULL_PAGE_VERTICES: Vertex[] = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

interface DragCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useCut(pageId)
// - 해당 페이지의 컷 목록 조회
// - 컷 분할 (splitCut)
// - 컷 선택 (selectCut)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useCut(pageId: string) {
  const {
    uiState,
    setCurrentCutId,
    cuts,
    setCuts,
    pages,
    setPages,
    canEdit,
  } = useData();
  const { currentProjectId, currentCutId } = uiState;

  // 현재 페이지의 컷 목록 (cutOrder 순서 유지)
  const page = pages[pageId];
  const cutList: Cut[] = page
    ? page.cutOrder.map((id) => cuts[id]).filter(Boolean)
    : [];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컷 선택
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const selectCut = useCallback(
    (cutId: string) => {
      setCurrentCutId(cutId);
    },
    [setCurrentCutId],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컷 분할
  // cutId: null이면 빈 페이지(전체 영역) 분할
  // drag: { startX, startY, endX, endY } — 0-100 좌표계
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const splitCut = useCallback(
    (cutId: string | null, { startX, startY, endX, endY }: DragCoords) => {
      if (!canEdit(currentProjectId)) {
        console.error("useCut: 수정 권한이 없습니다.");
        return;
      }

      const dx = endX - startX;
      const dy = endY - startY;
      const dragLen = Math.sqrt(dx * dx + dy * dy);
      if (dragLen < 3) return; // 너무 짧은 드래그는 무시

      // 분할 대상 폴리곤 꼭짓점 (vertices 없으면 전체 페이지로 폴백)
      const vertices: Vertex[] =
        cutId && cuts[cutId]?.vertices
          ? cuts[cutId].vertices
          : FULL_PAGE_VERTICES;

      // 드래그 방향 분류 → 실제 분할선 계산
      const splitType = classifySplitAngle(dx, dy);
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      let l1: Vertex, l2: Vertex;
      if (splitType === "horizontal") {
        [l1, l2] = getSnapLine("horizontal", midX, midY);
      } else if (splitType === "vertical") {
        [l1, l2] = getSnapLine("vertical", midX, midY);
      } else {
        const line = getDiagonalLine(startX, startY, endX, endY);
        if (!line) return;
        [l1, l2] = line;
      }

      // 폴리곤 분할
      const result = splitPolygon(vertices, l1, l2);
      if (!result) return;
      const [poly1, poly2] = result;

      // 새 컷 ID 생성 및 데이터 구성
      const newId1 = generateCutId(pageId);
      const newId2 = generateCutId(pageId);
      const now = new Date().toISOString();
      const newCut1: Cut = { pageId, cutId: newId1, createdAt: now, updatedAt: now, cutMemo: "", cutDetailMemos: {}, cutDetailMemoOrder: [], vertices: poly1 };
      const newCut2: Cut = { pageId, cutId: newId2, createdAt: now, updatedAt: now, cutMemo: "", cutDetailMemos: {}, cutDetailMemoOrder: [], vertices: poly2 };

      // cuts: 기존 컷 제거 + 새 컷 2개 추가
      setCuts((prev) => {
        const next = { ...prev };
        if (cutId) delete next[cutId];
        next[newId1] = newCut1;
        next[newId2] = newCut2;
        return next;
      });

      // page.cutOrder: 기존 컷 제거 + 새 컷 2개 추가
      setPages((prev) => {
        const p = prev[pageId];
        if (!p) return prev;
        const baseOrder = cutId
          ? removeFromOrder(p.cutOrder, cutId)
          : [...p.cutOrder];
        return {
          ...prev,
          [pageId]: {
            ...p,
            cutOrder: addToOrder(
              addToOrder(baseOrder, newId1),
              newId2,
            ),
          },
        };
      });
    },
    [pageId, cuts, setCuts, pages, setPages, canEdit, currentProjectId],
  );

  return {
    cutList,
    currentCutId,
    selectCut,
    splitCut,
  };
}
