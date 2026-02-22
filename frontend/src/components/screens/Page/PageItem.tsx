import CutCanvas from "../Cut/CutCanvas";

export default function PageItem({ page, showCutMemo = false }) {
  return (
    <div className="page-item">{showCutMemo && <CutCanvas page={page} />}</div>
  );
}
