import type { Episode, EpisodeStatus } from "types/entities";

const STATUS_BADGE: Record<EpisodeStatus, { cls: string; label: string }> = {
  draft:      { cls: "badge--todo", label: "예정" },
  inProgress: { cls: "badge--wip",  label: "진행중" },
  done:       { cls: "badge--done", label: "완료" },
};

interface Props {
  episode: Episode;
  displayNum: number;
  gradClass: string;
  isSelected: boolean;
  singleMemoContent: string;
  onClick: () => void;
}

export default function EpisodeItem({
  episode,
  displayNum,
  gradClass,
  isSelected,
  singleMemoContent,
  onClick,
}: Props) {
  const badge = STATUS_BADGE[episode.status];

  return (
    <div className={`erow${isSelected ? " on" : ""}`} onClick={onClick}>
      <div className="erow-drag">
        <span /><span /><span />
      </div>
      <div className={`erow-thumb ${gradClass}`}>
        <span className="erow-thumb-num">{displayNum}</span>
      </div>
      <div className="erow-body">
        <div className="erow-row1">
          <span className="erow-num">{displayNum}화</span>
          <span className="erow-pg">{episode.pageOrder.length}p</span>
        </div>
        <div className="erow-row2">
          <span className="erow-ttl">{episode.title}</span>
          <span className={`badge ${badge.cls}`}>{badge.label}</span>
        </div>
        <div className={`erow-memo${singleMemoContent ? "" : " empty"}`}>
          {singleMemoContent || "메모 없음"}
        </div>
      </div>
    </div>
  );
}
