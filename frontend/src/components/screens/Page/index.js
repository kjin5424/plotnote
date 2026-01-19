import "assets/css/screens/page.css";
import { useEffect, useState } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageHeader from "./PageHeader";
import PageGrid from "./PageGrid";
import useData from "contexts/DataContext";

export default function PageManagement() {
  const { episode, uiState } = useData();
  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<PageHeader episode={episode} />}
        body={<PageGrid pages={episode.pages} />}
      />
    </div>
  );
}
