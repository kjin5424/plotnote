import { useEpisode } from "hooks/data/useEpisode";

export default function EpisodeSidebar() {
  const { episodes, currentEpisodeId, selectEpisode } = useEpisode();

  return (
    <div className="episode-sidebar">
      <div className="episode-sidebar-header">
        <h3>에피소드</h3>
      </div>
      <div className="episode-sidebar-list">
        {episodes.map((episode) => (
          <div
            key={episode.episodeId}
            className={`episode-sidebar-item${episode.episodeId === currentEpisodeId ? " episode-sidebar-item--active" : ""}`}
            onClick={() => selectEpisode(episode.episodeId)}
          >
            {episode.title}
          </div>
        ))}
      </div>
    </div>
  );
}
