import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, useUI } from "contexts/StoreContext";
import CutHeader from "./CutHeader";
import CutBody from "./CutBody";

export default function CutManagement() {
  const { projectId, episodeId, pageId } = useParams<{
    projectId: string;
    episodeId: string;
    pageId: string;
  }>();
  const store = useStore();
  const { setCurrentPageId } = useUI();

  useEffect(() => {
    if (pageId) setCurrentPageId(pageId);
  }, [pageId, setCurrentPageId]);

  const project = projectId ? store.projects[projectId] : null;
  const episode = episodeId ? store.episodes[episodeId] : null;

  if (!episode || !project) {
    return <div className="pg-det-placeholder">에피소드를 찾을 수 없습니다.</div>;
  }

  const pageView =
    episode.settings?.pageView ?? project.settings.pageView ?? "single";
  const spreadStart =
    episode.settings?.spreadStart ?? project.settings.spreadStart ?? "odd";

  const pageOrder = episode.pageOrder;
  const currentIndex = pageId ? pageOrder.indexOf(pageId) : -1;

  const getPairedPageIds = (): string[] => {
    if (currentIndex < 0) return pageId ? [pageId] : [];
    if (pageView === "single") return [pageOrder[currentIndex]];
    if (spreadStart === "odd") {
      if (currentIndex === 0) return [pageOrder[0]];
      const groupIndex = Math.floor((currentIndex - 1) / 2);
      const startIdx = groupIndex * 2 + 1;
      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    } else {
      const groupIndex = Math.floor(currentIndex / 2);
      const startIdx = groupIndex * 2;
      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    }
  };

  const pages = getPairedPageIds()
    .map((id) => store.pages[id])
    .filter(Boolean);

  return (
    <div className="management-container">
      <div className="workspace-layout">
        <div className="workspace-header">
          <CutHeader
            projectId={projectId!}
            episodeId={episodeId!}
            pageId={pageId ?? null}
            pageOrder={pageOrder}
          />
        </div>
        <CutBody pages={pages} pageView={pageView} />
      </div>
    </div>
  );
}
