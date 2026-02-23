interface EpisodeHeaderProps {
  projectTitle: string;
  onAddEpisode: () => void;
}

export default function EpisodeHeader({ projectTitle, onAddEpisode }: EpisodeHeaderProps) {
  return (
    <div className="episode-header">
      <h2 className="episode-header-title">{projectTitle}</h2>
      <button className="episode-header-add-btn" onClick={onAddEpisode}>
        + 에피소드 추가
      </button>
    </div>
  );
}
