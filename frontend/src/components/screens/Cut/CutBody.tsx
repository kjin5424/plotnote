import CutHeader from "./CutHeader";
import CutCanvas from "./CutCanvas";

export default function CutBody({ pages, pageView }) {
  return (
    <div className="cut-body">
      <div className="cut-body-header">
        <CutHeader pages={pages} />
      </div>
      <div className="cut-body-content">
        <div className={`page-grid ${pageView}`}>
          {pages.map((page) => (
            <div key={page.pageId} className="page-item">
              <CutCanvas page={page} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
