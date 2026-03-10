import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";

interface Props {
  projectId: string;
  episodeId: string;
}

export default function PageHeader({ projectId, episodeId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const episode = store.episodes[episodeId];
  const pageCount = episode?.pageOrder.length ?? 0;

  const handleAddPage = () => {
    dispatch({ type: "ADD_PAGE", payload: { episodeId } });
  };

  return (
    <>
      <div className="ep-hd-breadcrumb">
        <span
          className="pg-ep-link"
          onClick={() => navigate(`/project/${projectId}/episode/${episodeId}`)}
        >
          {episode?.title ?? "에피소드"}
        </span>
        <span className="ws-sep">/</span>
        <span className="pg-hd-label">페이지 목록</span>
        <span className="pg-hd-count">({pageCount}p)</span>
      </div>
      <div className="pg-hd-right">
        <button className="btn btn--primary" onClick={handleAddPage}>
          + 페이지 추가
        </button>
      </div>
    </>
  );
}
