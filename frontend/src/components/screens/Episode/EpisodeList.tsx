import EpisodeItem from "./EpisodeItem";
import type { Episode } from "types/models";

interface EpisodeListProps {
  episodes: Episode[];
  onSelect: (episodeId: string) => void;
}

export default function EpisodeList({ episodes, onSelect }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <div className="episode-list-empty">에피소드가 없습니다. 추가해보세요.</div>
    );
  }

  return (
    <div className="episode-list">
      {episodes.map((episode) => (
        <EpisodeItem
          key={episode.episodeId}
          episode={episode}
          onClick={() => onSelect(episode.episodeId)}
        />
      ))}
    </div>
  );
}
