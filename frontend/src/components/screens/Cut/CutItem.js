// 개별 컷
export default function CutItem({ cut }) {
  return (
    <div className="cut-item">
      <div className="cut-content">{cut.memo}</div>
    </div>
  );
}
