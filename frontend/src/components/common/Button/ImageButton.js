export default function ImageButton({ image, text, onClickHandle }) {
  return (
    <button
      type="button"
      className={`image-btn ${image}`}
      onClick={onClickHandle}
    >
      {text}
    </button>
  );
}
