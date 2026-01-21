import "assets/css/screens/page.css";
import "assets/css/screens/cut.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import CutHeader from "./CutHeader";
import CutBody from "./CutBody";
import useData from "contexts/DataContext";

export default function CutManagement() {
  const { getCurrentCut, uiState } = useData();
  const currentPage = getCurrentCut();

  return (
    <div className="management-container">
      <WorkspaceLayout header={<CutHeader />} body={<CutBody />} />
    </div>
  );
}
