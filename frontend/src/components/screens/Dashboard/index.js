import WorkspaceLayout from "components/layout/WorkspaceLayout";
import DashboardHeader from "./DashboardHeader";
import Dashboard from "./Dashboard";

export default function DashboardManagement() {
  return (
    <div className="management-container">
      <WorkspaceLayout header={<DashboardHeader />} body={<Dashboard />} />
    </div>
  );
}
