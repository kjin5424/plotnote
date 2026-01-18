export default function HamburgerButton({ onClickHandle }) {
  return (
    <div className="hamburger-button">
      <button className="btn" onClick={onClickHandle}>
        햄버거
      </button>
    </div>
  );
}
