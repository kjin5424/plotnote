export default function CutHeader({ page }) {
  return (
    <div className="cut-header">
      <div className="cut-title">Page {page.number}</div>
      <div className={`page-memo ${page.memo ? "" : "empty"}`}>{page.memo}</div>
    </div>
  );
}
