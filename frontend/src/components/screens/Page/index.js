import "assets/css/screens/page.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import PageHeader from "./PageHeader";
import useData from "contexts/DataContext";
import { usePage } from "hooks/data/usePage";
import PageBody from "./PageBody";

export default function PageManagement() {
  const { getCurrentEpisode, getSetSettings } = useData();
  const { pages, addPage, deletePage, updatePageMemo, reorderPages } =
    usePage();
  const currentEpisode = getCurrentEpisode();
  const { pageView, readingDirection, spreadStart } = getSetSettings();

  if (!currentEpisode) {
    return <div>선택된 에피소드가 없습니다.</div>;
  }

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<PageHeader episode={currentEpisode} />}
        body={
          <PageBody
            pages={pages}
            onAddPage={addPage}
            onDeletePage={deletePage}
            onUpdateMemo={updatePageMemo}
            reorderPages={reorderPages}
            pageView={pageView}
            spreadStart={spreadStart}
            readingDirection={readingDirection}
          />
        }
      />
    </div>
  );
}
