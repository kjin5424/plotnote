import { useNavigate } from "react-router-dom";
import ImageButton from "components/common/Button/ImageButton";
import BreadCrumb from "./BreadCrumb";
import HeaderRight from "./HeaderRight";

export default function Header({ onClickHandle }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-left">
        <ImageButton
          image="img-menu"
          text="메뉴"
          onClickHandle={onClickHandle}
        />
        <BreadCrumb />
      </div>
      <div className="header-right">
        <HeaderRight />
      </div>
    </div>
  );
}
