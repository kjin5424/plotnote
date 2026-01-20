// 개별 컷
export default function CutItem({ cut }) {
  console.log(cut);
  return (
    <div className="cut-item">
      <div className="cut-content">{cut.cutId}</div>
    </div>
  );
}
