import "assets/css/screens/bookshelf.css";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import BookshelfHeader from "./BookshelfHeader";
import BookshelfList from "./BookshelfList";
export default function BookshelfManagement() {
  return (
    <div className="management-container">
      {/* Header + Grid */}
      <WorkspaceLayout head={<BookshelfHeader />} body={<BookshelfList />} />
    </div>
  );
}
