import { useNavigate } from "react-router-dom";

export default function PageGrid({ pages }) {
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
