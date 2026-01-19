import "assets/css/screens/page.css";
import "assets/css/screens/cut.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import CutHeader from "./CutHeader";
import CutCanvas from "./CutCanvas";

export default function CutManagement() {
  return (
    <div className="management-container">
      <WorkspaceLayout header={<CutHeader />} body={<CutCanvas />} />
    </div>
  );
}
