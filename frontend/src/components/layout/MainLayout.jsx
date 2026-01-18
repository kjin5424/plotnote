import Header from "components/screens/Header/Header";
import Sidebar from "components/screens/Sidebar/Sidebar";
import WorkspaceLayout from "./WorkspaceLayout";
import { useState } from "react";

// Sidebar + Workspace 레이아웃
export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="app-layout">
      <Header onClickHandle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <main>{children}</main>
      </div>
    </div>
  );
}
