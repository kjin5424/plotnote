import "assets/css/screens/page.css";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageHeader from "./PageHeader";
import PageGrid from "./PageGrid";
import useData from "contexts/DataContext";
<<<<<<< HEAD

export default function PageManagement() {
  const { episode, uiState } = useData();
  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<PageHeader episode={episode} />}
        body={<PageGrid pages={episode.pages} />}
=======
import { usePage } from "hooks/data/usePage";

export default function PageManagement() {
  const { getCurrentEpisode, uiState } = useData();
  const { pages, addPage, deletePage, updatePageMemo, reorderPages } =
    usePage();
  const currentEpisode = getCurrentEpisode();
  if (!currentEpisode) {
    return <div>선택된 에피소드가 없습니다.</div>;
  }
  const sortedPages =
    currentEpisode.pageOrder?.map((pageId) => ({
      ...pages[pageId],
      pageId,
    })) || [];

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<PageHeader episode={currentEpisode} />}
        body={
          <PageGrid
            pages={sortedPages}
            onAddPage={addPage}
            onDeletePage={deletePage}
            onUpdateMemo={updatePageMemo}
          />
        }
>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
      />
    </div>
  );
}
