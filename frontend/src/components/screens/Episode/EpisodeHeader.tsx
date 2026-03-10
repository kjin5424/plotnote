import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";

interface Props {
  projectId: string;
}

export default function EpisodeHeader({ projectId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const project = store.projects[projectId];

  const handleAddEpisode = () => {
    dispatch({ type: "ADD_EPISODE", payload: { projectId, title: "새 에피소드" } });
  };

  return (
    <>
      <div className="ep-hd-breadcrumb">
        <span
          className="ep-pj-link"
          onClick={() => navigate(`/project/${projectId}`)}
        >
          {project?.title ?? "프로젝트"}
        </span>
        <span className="ws-sep">/</span>
        <span className="ep-hd-label">에피소드 리스트</span>
      </div>
      <div className="ep-hd-right">
        <button className="btn btn--primary" onClick={handleAddEpisode}>
          + 에피소드 추가
        </button>
      </div>
    </>
  );
}
