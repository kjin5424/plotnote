// 개별 페이지 카드
function PageCard({ page, isSelected }) {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="page-number">{page.pageNumber}</div>
      <div className="page-thumbnail"></div>
    </div>
  );
}
