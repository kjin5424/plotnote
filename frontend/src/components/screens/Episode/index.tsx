import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, useUI } from "contexts/StoreContext";
import EpisodeHeader from "./EpisodeHeader";
import EpisodeNav from "./EpisodeList";
import EpisodeDetailPanel from "./EpisodeDetail";

export default function EpisodeManagement() {
  const { projectId, episodeId } = useParams<{
    projectId: string;
    episodeId: string;
  }>();
  const store = useStore();
  const { navigateToEpisode } = useUI();

  useEffect(() => {
    if (episodeId) navigateToEpisode(episodeId);
  }, [episodeId, navigateToEpisode]);

  if (!projectId || !store.projects[projectId]) {
    return <div className="det-placeholder">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="management-container">
      <div className="workspace-layout">
        <div className="workspace-header">
          <EpisodeHeader projectId={projectId} />
        </div>
        <div className="ep-workspace-body">
          <EpisodeNav projectId={projectId} selectedId={episodeId ?? null} />
          <EpisodeDetailPanel
            episodeId={episodeId ?? null}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
}
