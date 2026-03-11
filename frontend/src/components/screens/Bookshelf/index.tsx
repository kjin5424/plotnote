import { useEffect } from "react";
import WorkspaceLayout from "components/layout/WorkspaceLayout";
import BookshelfHeader from "./BookshelfHeader";
import BookshelfList from "./BookshelfList";
import { useStore, useUI, useDispatch } from "contexts/StoreContext";

export default function BookshelfManagement() {
  const store = useStore();
  const { ui, setCurrentBookshelfId } = useUI();
  const dispatch = useDispatch();

  useEffect(() => {
    const ids = Object.keys(store.bookshelves);
    if (ids.length === 0) {
      dispatch({ type: "ADD_BOOKSHELF", payload: { title: "나의 책장", ownerId: "me" } });
      return;
    }
    if (!ui.currentBookshelfId) {
      setCurrentBookshelfId(ids[0]);
    }
  }, [ui.currentBookshelfId, store.bookshelves, setCurrentBookshelfId, dispatch]);

  return (
    <div className="management-container">
      <WorkspaceLayout header={<BookshelfHeader />} body={<BookshelfList />} />
    </div>
  );
}
