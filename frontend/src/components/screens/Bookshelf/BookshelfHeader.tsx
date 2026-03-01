import { useStore, useUI } from "contexts/StoreContext";

export default function BookshelfHeader() {
  const store = useStore();
  const { ui } = useUI();
  const bookshelf = ui.currentBookshelfId ? store.bookshelves[ui.currentBookshelfId] : null;

  return (
    <div className="bookshelf-header">
      <h2 className="bookshelf-header-title">
        {bookshelf?.title ?? "책장"}
      </h2>
    </div>
  );
}
