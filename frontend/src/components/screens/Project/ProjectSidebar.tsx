import { useNavigate } from "react-router-dom";
import { useProject } from "hooks/data/useProject";
import useData from "contexts/DataContext";

export default function ProjectSidebar() {
  const { projects, currentProjectId, selectProject } = useProject();
  const { getCurrentBookshelf } = useData();
  const navigate = useNavigate();
  const bookshelf = getCurrentBookshelf();

  return (
    <div className="project-sidebar">
      <div className="project-sidebar-header">
        <button
          className="project-sidebar-back"
          onClick={() => navigate("/bookshelf")}
        >
          ← 책장
        </button>
        <p className="project-sidebar-bookshelf">{bookshelf?.title}</p>
      </div>
      <div className="project-sidebar-list">
        {projects.map((project) => (
          <div
            key={project.projectId}
            className={`project-sidebar-item${project.projectId === currentProjectId ? " project-sidebar-item--active" : ""}`}
            onClick={() => selectProject(project.projectId)}
          >
            {project.isFavorited && <span>★ </span>}
            {project.title}
          </div>
        ))}
      </div>
    </div>
  );
}
