import CutCanvas from "./CutCanvas";

export default function CutCard({ page }) {
  return (
    <div className="cut-card">
      <CutCanvas page={page} />
    </div>
  );
}
