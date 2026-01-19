import { usePage } from "hooks/data/usePage";

export default function PageHeader({ episode }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">화</h1>
      <div className="page-header-action">
        <button onClick={() => addPage(episode.episodeId)}>페이지 추가</button>
      </div>
    </div>
  );
}
