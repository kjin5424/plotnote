import type React from "react";
import CutCanvas from "./CutCanvas";
import type { Page } from "types/entities";

interface Props {
  pages: Page[];
  pageView: string;
}

export default function CutBody({ pages, pageView }: Props) {
  return (
    <div className="cut-body">
      <div className="cut-body-content">
        <div
          className={`cut-grid`}
          style={{ "--page-count": pages.length } as React.CSSProperties}
        >
          {pages.map((page) => (
            <div key={page.id} className="cut-card">
              <CutCanvas page={page} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
