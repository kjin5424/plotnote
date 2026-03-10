import { useCallback } from "react";
import { useStore, useDispatch, useUI } from "contexts/StoreContext";
import {
  classifySplitAngle,
  splitPolygon,
  getSnapLine,
  getDiagonalLine,
} from "utils/helpers/layoutUtils";
import type { Vertex, CutFrame } from "types/entities";

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

export function useCut(pageId: string) {
  const store = useStore();
  const dispatch = useDispatch();
  const { ui, setCurrentCutId } = useUI();

  const page = store.pages[pageId];
  const cutList = page
    ? page.cutOrder.map((id) => store.cuts[id]).filter(Boolean)
    : [];

  const selectCut = useCallback(
    (cutId: string) => {
      setCurrentCutId(cutId);
    },
    [setCurrentCutId],
  );

  const splitCut = useCallback(
    (cutId: string | null, { startX, startY, endX, endY }: DragCoords) => {
      const dx = endX - startX;
      const dy = endY - startY;
      const dragLen = Math.sqrt(dx * dx + dy * dy);
      if (dragLen < 3) return;

      const existingFrame: CutFrame | undefined = cutId
        ? store.cuts[cutId]?.frame
        : undefined;
      const vertices: Vertex[] = existingFrame?.vertices ?? FULL_PAGE_VERTICES;

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

      const result = splitPolygon(vertices, l1, l2);
      if (!result) return;
      const [poly1, poly2] = result;

      const baseFrame: CutFrame = existingFrame
        ? { ...existingFrame }
        : { x: 0, y: 0, w: 100, h: 100 };

      if (cutId) {
        dispatch({ type: "DELETE_CUT", payload: { id: cutId } });
      }
      dispatch({ type: "ADD_CUT", payload: { pageId, frame: { ...baseFrame, vertices: poly1 } } });
      dispatch({ type: "ADD_CUT", payload: { pageId, frame: { ...baseFrame, vertices: poly2 } } });
    },
    [pageId, store.cuts, dispatch],
  );

  return {
    cutList,
    currentCutId: ui.currentCutId,
    selectCut,
    splitCut,
  };
}
