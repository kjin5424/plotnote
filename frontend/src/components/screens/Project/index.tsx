import "assets/css/screens/project.css";
import { useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import ProjectSidebar from "./ProjectSidebar";
import ProjectHeader from "./ProjectHeader";
import ProjectGrid from "./ProjectGrid";

export default function ProjectManagement() {
  return (
    <div className="l-management-container">
      {/* 사이드바 : 프로젝트 썸네일 리스트? */}
      <ProjectSidebar />

      {/* Header + Grid */}
      <WorkspaceLayout header={<ProjectHeader />} body={<ProjectGrid />} />
    </div>
  );
}
