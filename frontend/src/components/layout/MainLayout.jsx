import Sidebar from "components/screens/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useResizeHandle, resizeEnd } from "hooks/ui/useResizeHandle";
import { Outlet } from "react-router-dom";
import useData from "contexts/DataContext";

// Sidebar + Workspace 레이아웃
export default function AppLayout() {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const { isLoading, uiState, toggleSidebar } = useData();
  const isSidebarOpen = uiState.isSidebarOpen;

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", useResizeHandle);
      document.addEventListener("mouseup", resizeEnd);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", useResizeHandle);
        document.removeEventListener("mouseup", useResizeHandle);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizing]);
  console.log(isSidebarOpen);
  if (isLoading) {
    return <div>데이터를 불러오는 중입니다</div>;
  }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        sidebarWidth={sidebarWidth}
        isResizing={isResizing}
        useResizeHandle={useResizeHandle}
        toggleSidebar={toggleSidebar}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
