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
<<<<<<< HEAD

  if (!currentEpisode) {
    return <div>선택된 에피소드가 없습니다.</div>;
  }
=======
  if (!currentEpisode) {
    return <div>선택된 에피소드가 없습니다.</div>;
  }
  const sortedPages =
    currentEpisode.pageOrder?.map((pageId) => ({
      ...pages[pageId],
      pageId,
    })) || [];
>>>>>>> 1d516b80943861e6eff3d027568ada90d0e0c62e

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<PageHeader episode={currentEpisode} />}
        body={
          <PageGrid
<<<<<<< HEAD
            pages={pages}
=======
            pages={sortedPages}
>>>>>>> 1d516b80943861e6eff3d027568ada90d0e0c62e
            onAddPage={addPage}
            onDeletePage={deletePage}
            onUpdateMemo={updatePageMemo}
          />
        }
      />
    </div>
  );
}
