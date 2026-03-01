import { useEffect } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import BookshelfHeader from "./BookshelfHeader";
import BookshelfList from "./BookshelfList";
import { useStore, useUI } from "contexts/StoreContext";

export default function BookshelfManagement() {
  const store = useStore();
  const { ui, setCurrentBookshelfId } = useUI();

  useEffect(() => {
    if (!ui.currentBookshelfId) {
      const firstId = Object.keys(store.bookshelves)[0];
      if (firstId) setCurrentBookshelfId(firstId);
    }
  }, [ui.currentBookshelfId, store.bookshelves, setCurrentBookshelfId]);

  return (
    <div className="management-container">
      <WorkspaceLayout header={<BookshelfHeader />} body={<BookshelfList />} />
    </div>
  );
}
