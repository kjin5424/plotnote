import ImageButton from "components/common/Button/ImageButton";
import { ResizeHandle } from "./ResizeHandle";

export default function Sidebar({
  isOpen,
  sidebarWidth,
  isResizing,
  useResizeHandle,
  toggleSidebar,
}) {
  isOpen = true;
  return (
    <>
      <div
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ width: isOpen ? `${sidebarWidth}px` : "60px" }}
      >
        <div className="sidebar-header">
          <span className="profile-icon">😊</span>
          <span className="profile-text">베베</span>
          <div className="sidebar-menu">
            <ImageButton
              image="img-menu"
              text="메뉴"
              onClickHandle={toggleSidebar}
            />
          </div>
        </div>
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
