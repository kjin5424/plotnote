// 개별 컷
export default function CutItem({ cut }) {
  return (
    <div className="cut-item">
      <div className="cut-content">{cut.memo}</div>
      <div className="cut-action">
        <button className="cut-action-btn">편집</button>
        <button className="cut-action-btn">삭제</button>
      </div>
    </div>
  );
}
