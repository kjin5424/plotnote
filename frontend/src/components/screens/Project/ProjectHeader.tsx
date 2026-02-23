import { useNavigate } from "react-router-dom";
import useData from "contexts/DataContext";

export default function ProjectHeader() {
  const { getCurrentProject, uiState } = useData();
  const project = getCurrentProject();
  const navigate = useNavigate();

  return (
    <div className="project-header">
      <h2 className="project-header-title">
        {project?.title ?? "프로젝트"}
      </h2>
      <button
        className="project-header-btn"
        onClick={() =>
          navigate(`/project/${uiState.currentProjectId}/episode`)
        }
      >
        에피소드 관리 →
      </button>
    </div>
  );
}
