import useData from "contexts/DataContext";
import { useCallback } from "react";
import { generatePageId } from "utils/helpers/idGenerator";

// 페이지 관련 CRUD 로직(도메인 로직 캡슐화)
export function usePage() {
  const {
    bookshelves,
    setBookshelves,
    uiState,
    getPages,
    getCurrentEpisode,
    canEdit,
  } = useData();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const addPage = useCallback(
    (pageData = {}) => {
      if (!canEdit()) {
        console.error("usePage : 수정 권한이 없습니다");
        return null;
      }

      const { currentBookshelfId, currentProjectId, currentEpisodeId } =
        uiState;

      if (!currentBookshelfId || !currentEpisodeId || !currentProjectId) {
        console.error("usePage : 현재 선택된 에피소드가 없습니다.");
        return null;
      }

      const newPageId = generatePageId();
      const currentEpisode = getCurrentEpisode();

      const newPage = {
        pageId: newPageId,
        pageNumber: Object.keys(currentEpisode?.pages || {}).length + 1,
        memo: pageData.memo || "",
        cutOrder: [],
        cuts: {},
        ...pageData,
      };

      setBookshelves((prev) => ({
        ...prev,
        [currentBookshelfId]: {
          ...prev[currentBookshelfId],
          projects: {
            ...prev[currentBookshelfId].projects,
            [currentProjectId]: {
              ...prev[currentBookshelfId].projects[currentProjectId],
              episodes: {
                ...prev[currentBookshelfId].projects[currentProjectId].episodes,
                [currentEpisodeId]: {
                  ...prev[currentBookshelfId].projects[currentProjectId]
                    .episodes[currentEpisodeId],
                  pageOrder: [
                    ...(prev[currentBookshelfId].projects[currentProjectId]
                      .episodes[currentEpisodeId].pageOrder || []),
                    newPageId,
                  ],
                  pages: {
                    ...prev[currentBookshelfId].projects[currentProjectId]
                      .episodes[currentEpisodeId].pages,
                    [newPageId]: newPage,
                  },
                },
              },
            },
          },
        },
      }));

      return newPageId;
    },
    [bookshelves, setBookshelves, uiState, getCurrentEpisode, canEdit],
  );
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 삭제
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const deletePage = useCallback(
    (pageId) => {
      if (!canEdit()) {
        console.error("usePage : 수정 권한이 없습니다.");
        return;
      }
      const { currentBookshelfId, currentProjectId, currentEpisodeId } =
        uiState;

      setBookshelves((prev) => {
        const episode =
          prev[currentBookshelfId].projects[currentProjectId].episodes[
            currentEpisodeId
          ];
        const { [pageId]: removed, ...remainingPages } = episode.pages;
        const newPageOrder = episode.pageOrder.filter((id) => id !== pageId);
        return {
          ...prev,
          [currentBookshelfId]: {
            ...prev[currentBookshelfId],
            projects: {
              ...prev[currentBookshelfId].projects,
              [currentProjectId]: {
                ...prev[currentBookshelfId].projects[currentProjectId],
                episodes: {
                  ...prev[currentBookshelfId].projects[currentProjectId]
                    .episodes,
                  [currentEpisodeId]: {
                    ...episode,
                    pageOrder: newPageOrder,
                    pages: remainingPages,
                  },
                },
              },
            },
          },
        };
      });
    },
    [bookshelves, setBookshelves, uiState, canEdit],
  );
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 메모 수정
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const updatePageMemo = useCallback(
    (pageId, memo) => {
      if (!canEdit()) {
        alert("수정 권한이 없습니다");
        return;
      }

      const { currentBookshelfId, currentProjectId, currentEpisodeId } =
        uiState;

      setBookshelves((prev) => ({
        ...prev,
        [currentBookshelfId]: {
          ...prev[currentBookshelfId],
          projects: {
            ...prev[currentBookshelfId].projects,
            [currentProjectId]: {
              ...prev[currentBookshelfId].projects[currentProjectId],
              episodes: {
                ...prev[currentBookshelfId].projects[currentProjectId].episodes,
                [currentEpisodeId]: {
                  ...prev[currentBookshelfId].projects[currentProjectId]
                    .episodes[currentEpisodeId],
                  pages: {
                    ...prev[currentBookshelfId].projects[currentProjectId]
                      .episodes[currentEpisodeId].pages,
                    [pageId]: {
                      ...prev[currentBookshelfId].projects[currentProjectId]
                        .episodes[currentEpisodeId].pages[pageId],
                      memo,
                    },
                  },
                },
              },
            },
          },
        },
      }));
    },
    [bookshelves, setBookshelves, uiState, canEdit],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 페이지 순서 변경 (드래그앤드롭)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const reorderPages = useCallback(
    (startIndex, endIndex) => {
      if (!canEdit()) {
        alert("수정 권한이 없습니다");
        return;
      }

      const { currentBookshelfId, currentProjectId, currentEpisodeId } =
        uiState;

      setBookshelves((prev) => {
        const episode =
          prev[currentBookshelfId].projects[currentProjectId].episodes[
            currentEpisodeId
          ];
        const newPageOrder = Array.from(episode.pageOrder);
        const [removed] = newPageOrder.splice(startIndex, 1);
        newPageOrder.splice(endIndex, 0, removed);

        return {
          ...prev,
          [currentBookshelfId]: {
            ...prev[currentBookshelfId],
            projects: {
              ...prev[currentBookshelfId].projects,
              [currentProjectId]: {
                ...prev[currentBookshelfId].projects[currentProjectId],
                episodes: {
                  ...prev[currentBookshelfId].projects[currentProjectId]
                    .episodes,
                  [currentEpisodeId]: {
                    ...episode,
                    pageOrder: newPageOrder,
                  },
                },
              },
            },
          },
        };
      });
    },
    [bookshelves, setBookshelves, uiState, canEdit],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 현재 에피소드의 페이지 목록 가져오기
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const getCurrentPages = useCallback(() => {
    return getPages() || {};
  }, [getPages]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환값
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return {
    // 조회
    pages: getCurrentPages(),

    // CRUD
    addPage,
    deletePage,
    updatePageMemo,
    reorderPages,
  };
}
