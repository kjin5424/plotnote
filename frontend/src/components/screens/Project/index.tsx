import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import ProjectHeader from "./ProjectHeader";
import ProjectGrid from "./ProjectGrid";
import { useStore, useUI } from "contexts/StoreContext";

export default function ProjectManagement() {
  const { projectId } = useParams<{ projectId: string }>();
  const store = useStore();
  const { navigateToProject } = useUI();

  useEffect(() => {
    if (projectId) navigateToProject(projectId);
  }, [projectId, navigateToProject]);

  if (!projectId || !store.projects[projectId]) {
    return <div className="project-no-selection">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="management-container">
      <WorkspaceLayout header={<ProjectHeader />} body={<ProjectGrid />} />
    </div>
  );
}
