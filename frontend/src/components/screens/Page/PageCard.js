const { default: CutGrid } = require("../Cut/CutGrid");

// 개별 페이지 카드
function PageCard({ page }) {
  return (
    <div
      key={page.pageId}
      className="page-card"
      onClick={() => useNavigate(`/${page.pageId}`)}
    >
      <CutGrid />
      <div className="page-card-info">
        <div className="page-number">{page.number}</div>
        <div className={`page-memo ${page.memo ? "" : "empty"}`}>
          {page.memo || ""}
        </div>
      </div>
    </div>
  );
}
