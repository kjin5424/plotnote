import { useProject } from "hooks/data/useProject";

export default function BookshelfList() {
  const { projects, currentProjectId, selectProject } = useProject();

  if (projects.length === 0) {
    return (
      <div className="bookshelf-empty">프로젝트가 없습니다.</div>
    );
  }

  return (
    <div className="bookshelf-grid">
      {projects.map((project) => (
        <div
          key={project.projectId}
          className={`bookshelf-card${project.projectId === currentProjectId ? " bookshelf-card--active" : ""}`}
          onClick={() => selectProject(project.projectId)}
        >
          <div className="bookshelf-card-thumbnail">
            {project.isFavorited && (
              <span className="bookshelf-card-star">★</span>
            )}
          </div>
          <div className="bookshelf-card-info">
            <p className="bookshelf-card-title">{project.title}</p>
            {project.projectMemo && (
              <p className="bookshelf-card-memo">{project.projectMemo}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
