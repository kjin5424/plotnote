import "assets/css/screens/page.css";
import { useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageSidebar from "./PageSidebar";
import PageHeader from "./PageHeader";
import PageGrid from "./PageGrid";

export default function PageManagement() {
  //const { pages, setPages } = useData();
  const { pages, setPages } = useState({});
  // 차후 useData로 바꿔야함

  // 화면 단위 상태 관리
  const [viewMode, setViewMode] = useState("double");
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <div className="l-management-container">
      {/* 사이드바 : 페이지 썸네일 리스트 */}
      <PageSidebar
        pages={pages}
        selectedPage={selectedPage}
        onPageClick={setSelectedPage}
      />

      {/* Header + Grid */}
      <WorkspaceLayout
        header={
          <PageHeader viewMode={viewMode} onViewModeChanges={setViewMode} />
        }
        body={
          <PageGrid
            pages={pages}
            viewMode={viewMode}
            selectedPage={selectedPage}
          />
        }
      />
    </div>
  );
}
