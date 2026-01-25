import "assets/css/screens/page.css";
import "assets/css/screens/cut.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import CutHeader from "./CutHeader";
import CutBody from "./CutBody";
import useData from "contexts/DataContext";
import { useParams } from "react-router-dom";

export default function CutManagement() {
  const { pageId } = useParams(); // URL에서 가져옴
  const { getCurrentEpisode, getCurrentSettings } = useData();
  const { pageView, spreadStart } = getCurrentSettings();

  const pageOrder = getCurrentEpisode().pageOrder;
  const currentIndex = pageOrder.findIndex((page) => page === pageId);

  const getPairedPages = () => {
    // 단면(single)일 때
    if (pageView === "single") {
      return [pageOrder[currentIndex]];
    }

    // 양면(spread)일 때
    if (spreadStart === "odd") {
      // 홀수 시작: [1], [2,3], [4,5], ...
      if (currentIndex === 0) {
        return [pageOrder[0]]; // 첫 페이지는 혼자
      }

      const adjustedIndex = currentIndex - 1; // 0번 제외
      const groupIndex = Math.floor(adjustedIndex / 2);
      const startIdx = groupIndex * 2 + 1; // 1부터 시작

      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    } else {
      // 짝수 시작: [1,2], [3,4], ...
      const groupIndex = Math.floor(currentIndex / 2);
      const startIdx = groupIndex * 2;

      return [pageOrder[startIdx], pageOrder[startIdx + 1]].filter(Boolean);
    }
  };
  const pages = getPairedPages();

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={<CutHeader />}
        body={<CutBody pages={pages} pageView={pageView} />}
      />
    </div>
  );
}
