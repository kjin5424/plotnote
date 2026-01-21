import { useNavigate } from "react-router-dom";
import PageCard from "./PageCard";

export default function PageGrid({
  page,
  onAddPage,
  onDeletePage,
  onUpdateMemo,
}) {
  console.log(page);
  const navigate = useNavigate();
  return (
    <div className="page-grid">
      <PageCard key={page.pageId} page={page} />
    </div>
  );
}
