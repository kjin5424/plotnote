import "assets/css/screens/page.css";
import "assets/css/screens/cut.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import CutHeader from "./CutHeader";
import CutBody from "./CutBody";
import useData from "contexts/DataContext";
import { useParams } from "react-router-dom";

export default function CutManagement() {
  const { pageId } = useParams();
  const { getCurrentEpisode, getCurrentSettings, getPage } = useData();
  const { pageView, spreadStart } = getCurrentSettings();

  const pageOrder = getCurrentEpisode().pageOrder;
  const currentIndex = pageOrder.findIndex((p) => p === pageId);

  const getPairedPageIds = () => {
    if (pageView === "single") {
      return [pageOrder[currentIndex]];
    }

    if (spreadStart === "odd") {
      if (currentIndex === 0) return [pageOrder[0]];
      const adjustedIndex = currentIndex - 1;
      const groupIndex = Math.floor(adjustedIndex / 2);
      const startIdx = groupIndex * 2 + 1;
      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    } else {
      const groupIndex = Math.floor(currentIndex / 2);
      const startIdx = groupIndex * 2;
      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    }
  };

  // pageId 문자열 → page 오브젝트로 변환
  const pages = getPairedPageIds()
    .map((id) => getPage(id))
    .filter(Boolean);

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<CutHeader />}
        body={<CutBody pages={pages} pageView={pageView} />}
      />
    </div>
  );
}
