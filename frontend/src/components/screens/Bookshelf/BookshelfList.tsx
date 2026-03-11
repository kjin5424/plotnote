import { useNavigate } from "react-router-dom";
import { useStore, useUI, useDispatch } from "contexts/StoreContext";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookshelf = ui.currentBookshelfId ? store.bookshelves[ui.currentBookshelfId] : null;
  const projects = bookshelf
    ? sortProjects(bookshelf.projectOrder.map(id => store.projects[id]).filter(Boolean))
    : [];

  const handleAddProject = () => {
    if (!ui.currentBookshelfId) return;
    dispatch({ type: "ADD_PROJECT", payload: { bookshelfId: ui.currentBookshelfId, title: "새 프로젝트" } });
  };

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
      <div className="bookshelf-card bookshelf-card--add" onClick={handleAddProject}>
        <div className="bookshelf-card-add-icon">+</div>
        <span>새 프로젝트</span>
      </div>
    </div>
  );
}
