import WorkspaceLayout from "components/layout/WorkspaceLayout";
import BookshelfHeader from "./BookshelfHeader";
import BookshelfList from "./BookshelfList";

export default function BookshelfManagement() {
  return (
    <div className="management-container">
      <WorkspaceLayout header={<BookshelfHeader />} body={<BookshelfList />} />
    </div>
  );
}
