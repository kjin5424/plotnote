import useData from "contexts/DataContext";

export default function BookshelfHeader() {
  const { getCurrentBookshelf } = useData();
  const bookshelf = getCurrentBookshelf();

  return (
    <div className="bookshelf-header">
      <h2 className="bookshelf-header-title">
        {bookshelf?.title ?? "책장"}
      </h2>
    </div>
  );
}
