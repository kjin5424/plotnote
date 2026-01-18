export default function Sidebar({ isOpen }) {
  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="sidebar-header">아이콘 / 베베</div>
      <div className="sidebar-body">
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
  );
}
