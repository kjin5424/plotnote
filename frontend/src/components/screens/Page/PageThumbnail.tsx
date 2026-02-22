// 재사용 가능한 썸네일 컴포넌트
export default function PageThumbnail({ page, isSelected }) {
  return (
    <div
      key={page.pageId}
      className={`page-thumbnail ${isSelected ? "selected" : ""}`}
      onClick={() => useNavigate(`/${page.pageId}`)}
    ></div>
  );
}
