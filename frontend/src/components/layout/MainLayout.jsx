import Header from "components/screens/Header/Header";
import Sidebar from "components/screens/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useResizeHandle, resizeEnd } from "hooks/ui/useResizeHandle";

// Sidebar + Workspace 레이아웃
export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);

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

  return (
    <div className="app-layout">
      <Header onClickHandle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          useResizeHandle={useResizeHandle}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
