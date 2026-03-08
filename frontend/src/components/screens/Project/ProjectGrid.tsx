import { useNavigate } from "react-router-dom";
import { useStore, useUI, useDispatch } from "contexts/StoreContext";
import type { EpisodeStatus } from "types/entities";

const STATUS_LABEL: Record<EpisodeStatus, string> = {
  draft: "예정",
  inProgress: "진행중",
  done: "완료",
};

const STATUS_MOD: Record<EpisodeStatus, string> = {
  draft: "project-ep-status--todo",
  inProgress: "project-ep-status--wip",
  done: "project-ep-status--done",
};

export default function ProjectGrid() {
  const store = useStore();
  const { ui } = useUI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const project = ui.currentProjectId
    ? store.projects[ui.currentProjectId]
    : null;
  const episodes = project
    ? project.episodeOrder.map((id) => store.episodes[id]).filter(Boolean)
    : [];

  const handleAddEpisode = () => {
    if (!project) return;
    dispatch({
      type: "ADD_EPISODE",
      payload: { projectId: project.id, title: "새 에피소드" },
    });
  };

  return (
    <div className="project-ep-list">
      {episodes.length === 0 && (
        <p className="project-ep-empty">에피소드가 없습니다.</p>
      )}
      {episodes.map((episode, index) => (
        <div
          key={episode.id}
          className="project-ep-row"
          onClick={() =>
            navigate(`/project/${project!.id}/episode/${episode.id}`)
          }
        >
          <span className="project-ep-num">{index + 1}화</span>
          <div className="project-ep-body">
            <span className="project-ep-title">{episode.title}</span>
            <span className="project-ep-pg">{episode.pageOrder.length}p</span>
          </div>
          <span className={`project-ep-status ${STATUS_MOD[episode.status]}`}>
            {STATUS_LABEL[episode.status]}
          </span>
        </div>
      ))}
      <div
        className="project-ep-row project-ep-row--add"
        onClick={handleAddEpisode}
      >
        + 에피소드 추가
      </div>
    </div>
  );
}
