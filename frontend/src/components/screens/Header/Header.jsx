import { useNavigate } from "react-router-dom";
import HamburgerButton from "./HamburgerButton";
import BreadCrumb from "./BreadCrumb";
import HeaderRight from "./HeaderRight";

export default function Header({ onClickHandle }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-left">
        <HamburgerButton onClick={onClickHandle} />
        <BreadCrumb />
      </div>
      <div className="header-right">
        <HeaderRight />
      </div>
    </div>
  );
}
