import { useNavigate } from "react-router-dom";
import { useStore, useUI } from "contexts/StoreContext";
import type { Project } from "types/entities";

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.isFavorited !== b.isFavorited) return a.isFavorited ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export default function BookshelfList() {
  const store = useStore();
  const { ui } = useUI();
  const navigate = useNavigate();

  const bookshelf = ui.currentBookshelfId ? store.bookshelves[ui.currentBookshelfId] : null;
  const projects = bookshelf
    ? sortProjects(bookshelf.projectOrder.map(id => store.projects[id]).filter(Boolean))
    : [];

  if (projects.length === 0) {
    return <div className="bookshelf-empty">프로젝트가 없습니다.</div>;
  }

  return (
    <div className="bookshelf-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`bookshelf-card${project.id === ui.currentProjectId ? " bookshelf-card--active" : ""}`}
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <div className="bookshelf-card-thumbnail">
            {project.isFavorited && (
              <span className="bookshelf-card-star">★</span>
            )}
          </div>
          <div className="bookshelf-card-info">
            <p className="bookshelf-card-title">{project.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
