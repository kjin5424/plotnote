// 에피소드 목록 조회, 선택, 추가
import useData from "contexts/DataContext";
import { useCallback } from "react";
import { nanoid } from "nanoid";
import { addToOrder } from "utils/helpers/orderManager";
import type { Episode } from "types/models";

export function useEpisode() {
  const {
    uiState,
    canEdit,
    projects,
    setProjects,
    episodes,
    setEpisodes,
    getEpisodes,
    navigateToEpisode,
  } = useData();
  const { currentProjectId, currentEpisodeId } = uiState;

  const episodeList: Episode[] = currentProjectId
    ? getEpisodes(currentProjectId)
    : [];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 에피소드 선택
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const selectEpisode = useCallback(
    (episodeId: string) => {
      navigateToEpisode(episodeId);
    },
    [navigateToEpisode],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 에피소드 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const addEpisode = useCallback(() => {
    if (!canEdit(currentProjectId)) return null;
    if (!currentProjectId) return null;

    const now = new Date().toISOString();
    const episodeId = `episode-${nanoid(8)}`;
    const episodeCount = episodeList.length + 1;

    const newEpisode: Episode = {
      projectId: currentProjectId,
      episodeId,
      title: `에피소드 ${episodeCount}`,
      thumbnailUrl: null,
      createdAt: now,
      updatedAt: now,
      permissions: {},
      settings: {
        defaultPageCount: null,
        spreadStart: null,
        readingDirection: null,
        pageView: null,
      },
      episodeMemo: "",
      episodeDetailMemos: {},
      episodeDetailMemoOrder: [],
      pageOrder: [],
    };

    setEpisodes((prev) => ({ ...prev, [episodeId]: newEpisode }));
    setProjects((prev) => ({
      ...prev,
      [currentProjectId]: {
        ...prev[currentProjectId],
        episodeOrder: addToOrder(
          prev[currentProjectId]?.episodeOrder ?? [],
          episodeId,
        ),
        updatedAt: now,
      },
    }));

    return episodeId;
  }, [currentProjectId, episodeList.length, canEdit, setEpisodes, setProjects]);

  return {
    episodes: episodeList,
    currentEpisodeId,
    selectEpisode,
    addEpisode,
  };
}
