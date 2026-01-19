import "assets/css/screens/page.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageHeader from "./PageHeader";
import PageGrid from "./PageGrid";
import useData from "contexts/DataContext";
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
      />
    </div>
  );
}
