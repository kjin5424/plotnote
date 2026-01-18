import "assets/css/screens/collection.css";
import { useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import CollectionHeader from "./CollectionHeader";
import CollectionList from "./CollectionList";
export default function CollectionManagement() {
  return (
    <div className="l-management-container">
      {/* 사이드바 : 페이지 썸네일 리스트??? */}
      <h1>컬렉션매니지먼트</h1>
      <p>CollectionSidebar??</p>

      {/* Header + Grid */}
      <WorkspaceLayout head={<CollectionHeader />} body={<CollectionList />} />
    </div>
  );
}
