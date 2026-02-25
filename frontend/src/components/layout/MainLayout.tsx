import Sidebar from "components/screens/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { startResize, updateWidth, endResize } from "hooks/ui/useResizeHandle";
import { Outlet } from "react-router-dom";
import useData from "contexts/DataContext";
import Guide from "components/screens/guide/Guide";
import PrototypeViewer from "components/screens/Prototype/PrototypeViewer";

// Sidebar + Workspace 레이아웃
export default function AppLayout() {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const { isLoading, uiState, toggleSidebar } = useData();
  const isSidebarOpen = uiState.isSidebarOpen;

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => updateWidth(e, setSidebarWidth);
    const handleMouseUp = () => endResize(setIsResizing);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다</div>;
  }

  return (
    <div className="app-layout">
      <div className="main-content">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          onResizeMouseDown={(e) => startResize(e, setIsResizing)}
          toggleSidebar={toggleSidebar}
        />
        <main>
          <Outlet />
        </main>
      </div>
      <PrototypeViewer />
      <Guide />
    </div>
  );
}
