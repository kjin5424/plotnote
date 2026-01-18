import { Link } from "react-router-dom";

export default function BreadCrumb({ currentPath }) {
  // {collection:"개인페이지", project:"작품명", episode:"1화", page:"page", pageCut:3}
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
    </div>
  );
}
