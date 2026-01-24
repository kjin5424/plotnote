import CutCanvas from "./CutCanvas";

export default function CutCard({ page }) {
  //   const { layout, selectCut, currentCutId, splitPanel } = useCut();
  console.log(page.pageId);
  return (
    <div className={`cut-card`}>
      <CutCanvas page={page} />
    </div>
  );
}
