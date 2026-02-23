import { useNavigate } from "react-router-dom";
import { useEpisode } from "hooks/data/useEpisode";
import useData from "contexts/DataContext";

export default function ProjectGrid() {
  const { episodes, selectEpisode, addEpisode } = useEpisode();
  const { uiState } = useData();
  const navigate = useNavigate();

  const handleSelectEpisode = (episodeId: string) => {
    selectEpisode(episodeId);
    navigate(`/project/${uiState.currentProjectId}/episode`);
  };

  return (
    <div className="project-grid">
      <div className="project-grid-action">
        <button className="project-grid-add-btn" onClick={addEpisode}>
          + 에피소드 추가
        </button>
      </div>
      <div className="project-episode-list">
        {episodes.length === 0 ? (
          <p className="project-episode-empty">에피소드가 없습니다.</p>
        ) : (
          episodes.map((episode, index) => (
            <div
              key={episode.episodeId}
              className="project-episode-item"
              onClick={() => handleSelectEpisode(episode.episodeId)}
            >
              <div className="project-episode-thumb" />
              <div className="project-episode-info">
                <p className="project-episode-number">{index + 1}화</p>
                <p className="project-episode-title">{episode.title}</p>
                {episode.episodeMemo && (
                  <p className="project-episode-memo">{episode.episodeMemo}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
