import ImageButton from "components/common/Button/ImageButton";
import { Link } from "react-router-dom";

export default function BreadCrumb({ currentPath }) {
  // {collection:"개인페이지", project:"작품명", episode:"1화", page:"page", pageCut:3}
  return (
    <div className="breadcrumb">
      <Link to="/">
        <ImageButton image="img-home" text="홈" />
      </Link>
    </div>
  );
}
