import "assets/css/screens/page.css";
import "assets/css/screens/cut.css";
import { useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageSidebar from "../Page/PageSidebar";
import CutHeader from "./CutHeader";
import CutGrid from "./CutGrid";

export default function CutManagement() {
  return (
    <div className="l-management-container">
      {/* 사이드바 : 페이지 썸네잉ㄹ 리스트 */}
      <PageSidebar />
      {/* <PageSidebar
              pages={pages}
              selectedPage={selectedPage}
              onPageClick={setSelectedPage}
            /> */}

      {/* Header + Grid */}
      <WorkspaceLayout header={<CutHeader />} body={<CutGrid />} />
    </div>
  );
}
