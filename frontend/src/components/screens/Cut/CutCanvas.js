// 컷 편집 캔버스 (확대/축소/분할)
export default function CutCanvas({ page }) {
  return (
    <div className="cut-canvas">
      <div className="cut-grid">
        {page.cuts.map((cut, i) => {
          <CutItem key={cut.cutId} cut={cut} index={i} />;
        })}
      </div>
    </div>
  );
}
