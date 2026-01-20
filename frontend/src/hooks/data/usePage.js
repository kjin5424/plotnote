import useData from "contexts/DataContext";
import { useCallback } from "react";
import { generatePageId } from "utils/helpers/idGenerator";
import {
  addToOrder,
  removeFromOrder,
  reorder,
} from "utils/helpers/orderManager";

// 페이지 관련 CRUD 로직(도메인 로직 캡슐화)
export function usePage() {
  const { uiState, canEdit, episodes, setEpisodes, pages, setPages, getPages } =
    useData();
  const { currentProjectId, currentEpisodeId } = uiState;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const addPage = useCallback(() => {
    if (!canEdit(currentProjectId)) {
      console.error("usePage : 수정 권한이 없습니다");
      return null;
    }
    if (!currentEpisodeId) {
      console.error("usePage : 선택된 에피소드 없음");
      return null;
    }

    const newPageId = generatePageId();
    const currentEpisode = episodes[currentEpisodeId];

    const newPage = {
      episodeId: currentEpisode.episodeId,
      pageId: newPageId,
      pageMemo: "",
      cutOrder: [],
    };

    setPages((prev) => ({
      ...prev,
      [newPageId]: newPage,
    }));
    setEpisodes((prev) => ({
      ...prev,
      [currentEpisodeId]: {
        ...prev[currentEpisodeId],
        pageOrder: addToOrder(
          prev[currentEpisodeId]?.pageOrder || [],
          newPageId,
        ),
      },
    }));
    return newPageId;
  }, [
    currentEpisodeId,
    episodes,
    setPages,
    setEpisodes,
    canEdit,
    uiState.currentProjectId,
  ]);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 삭제
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const deletePage = useCallback(
    (pageId) => {
      if (!canEdit(currentProjectId)) {
        console.error("usePage : 수정 권한이 없습니다.");
        return;
      }

      setPages((prev) => {
        const { [pageId]: _, ...rest } = prev;
        return rest;
      });
      setEpisodes((prev) => ({
        ...prev,
        [currentEpisodeId]: {
          ...prev[currentEpisodeId],
          pageOrder: removeFromOrder(prev[currentEpisodeId].pageOrder, pageId),
        },
      }));
    },
    [
      currentEpisodeId,
      setPages,
      setEpisodes,
      canEdit,
      uiState.currentProjectId,
    ],
  );
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 메모 수정
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const updatePageMemo = useCallback(
    (pageId, memo) => {
      if (!canEdit(currentProjectId)) {
        console.error("usePage : 수정 권한이 없습니다.");
        return;
      }

      setPages((prev) => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          pageMemo: memo,
        },
      }));
    },
    [setPages, canEdit, uiState.currentProjectId],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 순서 변경 (드래그앤드롭)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const reorderPages = useCallback(
    (startIndex, endIndex) => {
      if (!canEdit(currentProjectId)) {
        console.error("usePage : 수정 권한이 없습니다.");
        return;
      }

      setEpisodes((prev) => ({
        ...prev,
        [currentEpisodeId]: {
          ...prev[currentEpisodeId],
          pageOrder: reorder(
            prev[currentEpisodeId].pageOrder,
            startIndex,
            endIndex,
          ),
        },
      }));
    },
    [currentEpisodeId, setEpisodes, canEdit, currentProjectId],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 현재 에피소드의 페이지 목록 가져오기
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const currentPageList = useCallback(() => {
    return getPages(currentEpisodeId) || [];
  }, [getPages, currentEpisodeId]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환값
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return {
    pages: currentPageList(),
    addPage,
    deletePage,
    updatePageMemo,
    reorderPages,
  };
}
