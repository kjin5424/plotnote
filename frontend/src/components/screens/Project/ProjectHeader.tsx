import { useStore, useUI, useDispatch } from "contexts/StoreContext";

export default function ProjectHeader() {
  const store = useStore();
  const { ui } = useUI();
  const dispatch = useDispatch();
  const project = ui.currentProjectId ? store.projects[ui.currentProjectId] : null;

  const handleAddEpisode = () => {
    if (!project) return;
    dispatch({ type: "ADD_EPISODE", payload: { projectId: project.id, title: "새 에피소드" } });
  };

  const handleToggleFavorite = () => {
    if (!project) return;
    dispatch({ type: "UPDATE_PROJECT", payload: { id: project.id, isFavorited: !project.isFavorited } });
  };

  return (
    <div className="project-header">
      <div className="project-header-left">
        <h2 className="project-header-title">{project?.title ?? "프로젝트"}</h2>
        <button
          className={`project-header-fav${project?.isFavorited ? " on" : ""}`}
          onClick={handleToggleFavorite}
          aria-label="즐겨찾기 토글"
        >
          ★
        </button>
      </div>
      <button className="btn btn--primary" onClick={handleAddEpisode}>
        + 에피소드 추가
      </button>
    </div>
  );
}
