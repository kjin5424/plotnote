import PageThumbnail from "./PageThumbnail";

export default function PageSidebar({ pages, selectedPage, onPageClick }) {
  return (
    <div className="l-sidebar">
      {/* 사이드바 헤더 */}
      <div className="l-sidebar-header">
        <h3>프로젝트명</h3>
        <p>에피소드명</p>
      </div>

      {/* 사이드바 바디 */}
      <div className="l-sidebar-content">
        <PageThumbnail
          key="page.pageId"
          page="page"
          isSelected="selectedPage===page.pageId"
          onClick={() => console.log("onPageClick(page.pageId)")}
        />
      </div>
    </div>
  );
}
