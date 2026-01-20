import { useNavigate } from "react-router-dom";
import PageItem from "./PageItem";

// 개별 페이지 카드
export default function PageCard({ page }) {
  const navigate = useNavigate();
  return (
    <div
      key={page.pageId}
      className="page-card"
      onClick={() => navigate(`/${page.pageId}`)}
    >
      <PageItem page={page} showCutMemo={true} />
      <div className="page-card-info">
        <div className="page-number">{page.number}</div>
        <div className={`page-memo ${page.memo ? "" : "empty"}`}>
          {page.memo || ""}
        </div>
      </div>
    </div>
  );
}
