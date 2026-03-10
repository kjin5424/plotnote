import { useNavigate } from "react-router-dom";
import type { Page } from "types/entities";

interface Props {
  page: Page;
  displayNum: number;
  isSelected: boolean;
  memoContent: string;
  projectId: string;
  episodeId: string;
  onClick: () => void;
}

export default function PageCard({
  page,
  displayNum,
  isSelected,
  memoContent,
  projectId,
  episodeId,
  onClick,
}: Props) {
  const navigate = useNavigate();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(
      `/project/${projectId}/episode/${episodeId}/page/${page.id}`
    );
  };

  return (
    <div className={`pcard${isSelected ? " on" : ""}`} onClick={onClick}>
      <div className="pcard-thumb">
        <div className="pcard-edit-btn" onClick={handleEditClick}>
          <div className="pcard-edit-btn-inner">컷 편집</div>
        </div>
      </div>
      <div className="pcard-info">
        <span className="pcard-num">{displayNum}p</span>
        <span className={`pcard-memo${memoContent ? "" : " empty"}`}>
          {memoContent || "메모 없음"}
        </span>
      </div>
    </div>
  );
}
