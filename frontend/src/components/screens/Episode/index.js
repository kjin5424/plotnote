import "assets/css/screens/project.css";
import { useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import EpisodeSidebar from "./EpisodeSidebar";
import EpisodeHeader from "./EpisodeHeader";
import EpisodeList from "./EpisodeList";

export default function ProjectManagement() {
  return (
    <div className="l-management-container">
      {/* 사이드바 : 프로젝트 썸네일 리스트? */}
      <EpisodeSidebar />

      {/* Header + Grid */}
      <WorkspaceLayout head={<EpisodeHeader />} body={<EpisodeList />} />
    </div>
  );
}
