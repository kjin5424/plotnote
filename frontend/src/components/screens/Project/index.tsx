import WorkspaceLayout from "components/layout/WorkspaceLayout";
import ProjectHeader from "./ProjectHeader";
import ProjectGrid from "./ProjectGrid";
import useData from "contexts/DataContext";

export default function ProjectManagement() {
  const { getCurrentProject } = useData();

  if (!getCurrentProject()) {
    return <div className="project-no-selection">선택된 프로젝트가 없습니다.</div>;
  }

  return (
    <div className="management-container">
      <WorkspaceLayout header={<ProjectHeader />} body={<ProjectGrid />} />
    </div>
  );
}
