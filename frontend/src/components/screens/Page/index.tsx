import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, useUI } from "contexts/StoreContext";
import PageHeader from "./PageHeader";
import PageNav from "./PageBody";
import PageDetailPanel from "./PageDetail";

export default function PageManagement() {
  const { projectId, episodeId, pageId } = useParams<{
    projectId: string;
    episodeId: string;
    pageId: string;
  }>();
  const store = useStore();
  const { navigateToPage } = useUI();

  useEffect(() => {
    if (pageId) navigateToPage(pageId);
  }, [pageId, navigateToPage]);

  if (!episodeId || !store.episodes[episodeId]) {
    return <div className="pg-det-placeholder">에피소드를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="management-container">
      <div className="workspace-layout">
        <div className="workspace-header">
          <PageHeader projectId={projectId!} episodeId={episodeId} />
        </div>
        <div className="pg-workspace-body">
          <PageNav
            episodeId={episodeId}
            projectId={projectId!}
            selectedId={pageId ?? null}
          />
          <PageDetailPanel
            pageId={pageId ?? null}
            episodeId={episodeId}
            projectId={projectId!}
          />
        </div>
      </div>
    </div>
  );
}
