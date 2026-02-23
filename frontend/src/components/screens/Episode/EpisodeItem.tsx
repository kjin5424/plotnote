import type { Episode } from "types/models";

interface EpisodeItemProps {
  episode: Episode;
  onClick: () => void;
}

export default function EpisodeItem({ episode, onClick }: EpisodeItemProps) {
  return (
    <div className="episode-item" onClick={onClick}>
      <div className="episode-item-thumbnail" />
      <div className="episode-item-info">
        <p className="episode-item-title">{episode.title}</p>
        {episode.episodeMemo ? (
          <p className="episode-item-memo">{episode.episodeMemo}</p>
        ) : (
          <p className="episode-item-memo episode-item-memo--empty">메모 없음</p>
        )}
      </div>
    </div>
  );
}
