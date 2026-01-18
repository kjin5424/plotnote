import EpisodeList from "./EpisodeList";

export default function EpisodeSidebar() {
  return (
    <div className="l-sidebar">
      {/* 사이드바 헤더 */}
      <div className="l-sidebar-header">
        <h3>프로젝트명??</h3>
      </div>

      {/* 사이드바 바디 */}
      <div className="l-sidebar-content">
        <EpisodeList />
      </div>
    </div>
  );
}
