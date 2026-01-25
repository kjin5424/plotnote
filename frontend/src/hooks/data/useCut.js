import { useState, useCallback } from "react";
import useData from "contexts/DataContext";
import layoutUtils from "utils/helpers/layoutUtils";

export function useCut() {
  // 초기 레이아웃 (1x1 단일 )
  const [layout, setLayout] = useState({
    columns: [1], // fr 단위
    rows: [1],
    cuts: [
      {
        id: 1,
        colStart: 1,
        colEnd: 2,
        rowStart: 1,
        rowEnd: 2,
        hasRightDivider: false,
        hasBottomDivider: false,
      },
    ],
  });

  const { uiState, setUiState } = useData();
  const { shiftCuts } = layoutUtils();
  const currentCutId = uiState.currentCutId;

  //  선택
  const selectCut = useCallback((cut) => {
    setUiState((prev) => ({ ...prev, currentCutId: cut }));
  }, []);

  //  수직 분할 (좌우)
  const splitVertical = useCallback((cutId) => {
    setLayout((prev) => {
      const cut = prev.cuts.find((c) => c.id === cutId);
      if (!cut) return prev;

      const insertIndex = cut.colStart; // 실제 Grid Track 위치

      // 1. 컬럼 비율 나누기
      const newColumns = [...prev.columns];
      newColumns.splice(insertIndex - 1, 1, 0.5, 0.5);

      // 2. 기존 패널들 좌표 밀기 (유틸리티 함수 사용)
      let updatedCuts = shiftCuts(prev.cuts, "vertical", insertIndex);

      // 3. 현재 패널 크기 조정 및 새 패널 추가
      updatedCuts = updatedCuts.map((c) =>
        c.id === cutId
          ? { ...c, colEnd: c.colStart + 1, hasRightDivider: true }
          : c,
      );

      const newCut = {
        id: Date.now(),
        colStart: cut.colStart + 1,
        colEnd: cut.colStart + 2,
        rowStart: cut.rowStart,
        rowEnd: cut.rowEnd,
        hasRightDivider: cut.hasRightDivider,
        hasBottomDivider: cut.hasBottomDivider,
      };

      return { ...prev, columns: newColumns, cuts: [...updatedCuts, newCut] };
    });
  }, []);

  //  수평 분할 (상하)
  const splitHorizontal = useCallback((cutId) => {
    setLayout((prev) => {
      const cut = prev.cuts.find((c) => c.id === cutId);
      if (!cut) return prev;

      const newRows = [...prev.rows];
      const insertIndex = cut.rowStart - 1;
      newRows.splice(insertIndex, 1, 0.5, 0.5);

      const newcuts = prev.cuts.map((c) => {
        if (c.id === cutId) {
          return {
            ...c,
            rowEnd: c.rowStart + 1,
            hasBottomDivider: true,
          };
        }
        if (c.rowStart >= cut.rowEnd) {
          return {
            ...c,
            rowStart: c.rowStart + 1,
            rowEnd: c.rowEnd + 1,
          };
        }
        return c;
      });

      const newCut = {
        id: Date.now(),
        colStart: cut.colStart,
        colEnd: cut.colEnd,
        rowStart: cut.rowStart + 1,
        rowEnd: cut.rowEnd + 1,
        hasRightDivider: cut.hasRightDivider,
        hasBottomDivider: cut.hasBottomDivider,
      };

      return {
        columns: prev.columns,
        rows: newRows,
        cuts: [...newcuts, newCut],
      };
    });
  }, []);

  // 통합 분할 함수
  const splitPanel = useCallback(
    (direction) => {
      if (!currentCutId) return;

      if (direction === "vertical") {
        splitVertical(currentCutId.id);
      } else if (direction === "horizontal") {
        splitHorizontal(currentCutId.id);
      }
    },
    [currentCutId, splitVertical, splitHorizontal],
  );

  //  크기 조정
  const updatecutsize = useCallback(
    (cutId, direction, deltaX, deltaY, containerSize) => {
      setLayout((prev) => {
        const cut = prev.cuts.find((c) => c.id === cutId);
        if (!cut) return prev;

        const newColumns = [...prev.columns];
        const newRows = [...prev.rows];

        if (direction === "vertical") {
          // deltaX(px)를 fr 비율로 변환 (전체 너비 기준)
          const deltaFr = deltaX / containerSize.width;
          const trackIndex = cut.colEnd - 2; // 현재 패널이 끝나는 지점의 Track 인덱스

          if (newColumns[trackIndex + 1] !== undefined) {
            newColumns[trackIndex] += deltaFr;
            newColumns[trackIndex + 1] -= deltaFr;
          }
        } else if (direction === "horizontal") {
          const deltaFr = deltaY / containerSize.height;
          const trackIndex = cut.rowStart - 1;

          if (newRows[trackIndex + 1] !== undefined) {
            newRows[trackIndex] += deltaFr;
            newRows[trackIndex + 1] -= deltaFr;
          }
        }

        // 최소 크기 제한 (0.1fr 이하로 줄어들지 않게)
        if (newColumns.some((v) => v < 0.1) || newRows.some((v) => v < 0.1))
          return prev;

        return { ...prev, columns: newColumns, rows: newRows };
      });
    },
    [],
  );

  // 레이아웃 저장
  const saveLayout = useCallback(async () => {
    try {
      await saveLayoutToServer(layout);
      alert("레이아웃이 저장되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  }, [layout]);

  return {
    layout,
    currentCutId,
    splitPanel,
    selectCut,
    updatecutsize,
    saveLayout,
  };
}
