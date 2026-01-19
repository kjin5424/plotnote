import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
export default function PageGrid({
  pages,
  onAddPage,
  onDeletePage,
  onUpdateMemo,
}) {
=======
export default function PageGrid({ pages }) {
>>>>>>> 679aa2a191b485ac4096a2254ed6129bb0143f90
  const navigate = useNavigate();

  return (
    <div className="page-grid">
      {pages.map((page) => (
        <div
          key={page.pageId}
          className="page-card"
          onClick={() => navigate(`/${page.pageId}`)}
        ></div>
      ))}
    </div>
  );
}
