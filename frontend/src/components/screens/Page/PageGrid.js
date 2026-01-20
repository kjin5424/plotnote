import { useNavigate } from "react-router-dom";
import PageCard from "./PageCard";

export default function PageGrid({
  pages,
  onAddPage,
  onDeletePage,
  onUpdateMemo,
}) {
  console.log(pages);
  const navigate = useNavigate();

  return (
    <div className="page-grid">
      {pages.map((page) => (
        <PageCard key={page.pageId} page={page} />
      ))}
    </div>
  );
}
