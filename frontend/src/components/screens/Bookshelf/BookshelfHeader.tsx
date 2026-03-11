import { useStore, useUI, useDispatch } from "contexts/StoreContext";

export default function BookshelfHeader() {
  const store = useStore();
  const { ui } = useUI();
  const dispatch = useDispatch();
  const bookshelf = ui.currentBookshelfId ? store.bookshelves[ui.currentBookshelfId] : null;

  const handleAddProject = () => {
    if (!ui.currentBookshelfId) return;
    dispatch({ type: "ADD_PROJECT", payload: { bookshelfId: ui.currentBookshelfId, title: "새 프로젝트" } });
  };

  return (
    <div className="bookshelf-header">
      <h2 className="bookshelf-header-title">
        {bookshelf?.title ?? "책장"}
      </h2>
      <div className="bookshelf-header-actions">
        <button className="btn btn--primary" onClick={handleAddProject}>
          + 새 프로젝트
        </button>
      </div>
    </div>
  );
}
