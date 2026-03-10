import { useNavigate } from "react-router-dom";
import { useStore } from "contexts/StoreContext";

interface Props {
  projectId: string;
  episodeId: string;
  pageId: string | null;
  pageOrder: string[];
}

export default function CutHeader({ projectId, episodeId, pageId, pageOrder }: Props) {
  const store = useStore();
  const navigate = useNavigate();

  const episode = store.episodes[episodeId];
  const currentIndex = pageId ? pageOrder.indexOf(pageId) : -1;

  const goPrev = () => {
    if (currentIndex <= 0) return;
    navigate(`/project/${projectId}/episode/${episodeId}/page/${pageOrder[currentIndex - 1]}`);
  };

  const goNext = () => {
    if (currentIndex < 0 || currentIndex >= pageOrder.length - 1) return;
    navigate(`/project/${projectId}/episode/${episodeId}/page/${pageOrder[currentIndex + 1]}`);
  };

  const pageLabel = currentIndex >= 0 ? `${currentIndex + 1}p` : "";

  return (
    <>
      <div className="ep-hd-breadcrumb">
        <span
          className="ct-ep-link"
          onClick={() =>
            navigate(`/project/${projectId}/episode/${episodeId}/page`)
          }
        >
          {episode?.title ?? "에피소드"}
        </span>
        <span className="ws-sep">/</span>
        <span className="ct-pg-num">{pageLabel}</span>
      </div>
      <div className="pg-hd-right">
        <div className="ct-pg-nav">
          <button
            className="btn"
            onClick={goPrev}
            disabled={currentIndex <= 0}
            title="이전 페이지"
          >
            이전
          </button>
          <button
            className="btn"
            onClick={goNext}
            disabled={currentIndex < 0 || currentIndex >= pageOrder.length - 1}
            title="다음 페이지"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
