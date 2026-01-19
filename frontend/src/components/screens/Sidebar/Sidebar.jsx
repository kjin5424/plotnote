import { ResizeHandle } from "./ResizeHandle";

export default function Sidebar({
  isOpen,
  sidebarWidth,
  isResizing,
  useResizeHandle,
}) {
  return (
    <>
      <div
        className={isOpen ? "sidebar open" : "sidebar"}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="sidebar-header">아이콘 / 베베</div>
        <div className="sidebar-body">
          <span>트리뷰</span>
          <div className="sidebar-menu-group">
            <span>즐겨찾기</span>
          </div>
          <div className="sidebar-menu-group">
            <span>개인 페이지</span>
          </div>
          <div className="sidebar-menu-group">
            <span>공유 페이지</span>
          </div>
        </div>
        <div className="sidebar-footer">설정</div>
      </div>
      <ResizeHandle isResizing={isResizing} onMouseDown={useResizeHandle} />
    </>
  );
}
