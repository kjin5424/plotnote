import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";
import type { SpreadStart } from "types/settings";
import PageCard from "./PageCard";

interface Props {
  episodeId: string;
  projectId: string;
  selectedId: string | null;
}

export default function PageNav({ episodeId, projectId, selectedId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const episode = store.episodes[episodeId];
  const project = store.projects[projectId];

  const effectivePageView =
    episode?.settings?.pageView ??
    project?.settings?.pageView ??
    "spread";

  const effectiveSpreadStart: SpreadStart =
    (episode?.settings?.spreadStart ??
    project?.settings?.spreadStart) ??
    "odd";

  const [viewMode, setViewMode] = useState<"spread" | "single">(effectivePageView);
  const [zoom, setZoom] = useState(100);
  const [collapsed, setCollapsed] = useState(false);

  const pages = episode
    ? episode.pageOrder.map((id) => store.pages[id]).filter(Boolean)
    : [];

  const handleSelect = (id: string) => {
    navigate(`/project/${projectId}/episode/${episodeId}/page/${id}`);
  };

  const handleAddPage = () => {
    dispatch({ type: "ADD_PAGE", payload: { episodeId } });
  };

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(200, Math.max(40, prev + delta)));
  };

  const getMemo = (pageId: string) => {
    const memo = Object.values(store.memos).find(
      (m) =>
        m.parentId === pageId &&
        m.parentType === "PAGE" &&
        m.role === "SINGLE"
    );
    return memo?.content ?? "";
  };

  const renderSpreadView = () => {
    const rows: React.ReactElement[] = [];
    let i = 0;

    if (effectiveSpreadStart === "odd" && pages.length > 0) {
      rows.push(
        <div className="pg-spread-row" key="spread-cover">
          <div className="pcard pcard--blank" />
          <PageCard
            key={pages[0].id}
            page={pages[0]}
            displayNum={1}
            isSelected={pages[0].id === selectedId}
            memoContent={getMemo(pages[0].id)}
            projectId={projectId}
            episodeId={episodeId}
            onClick={() => handleSelect(pages[0].id)}
          />
        </div>
      );
      i = 1;
    }

    for (; i < pages.length; i += 2) {
      const left = pages[i];
      const right = pages[i + 1];
      rows.push(
        <div className="pg-spread-row" key={`spread-${i}`}>
          <PageCard
            page={left}
            displayNum={i + 1}
            isSelected={left.id === selectedId}
            memoContent={getMemo(left.id)}
            projectId={projectId}
            episodeId={episodeId}
            onClick={() => handleSelect(left.id)}
          />
          {right ? (
            <PageCard
              page={right}
              displayNum={i + 2}
              isSelected={right.id === selectedId}
              memoContent={getMemo(right.id)}
              projectId={projectId}
              episodeId={episodeId}
              onClick={() => handleSelect(right.id)}
            />
          ) : (
            <div className="pcard pcard--blank" />
          )}
        </div>
      );
    }

    rows.push(
      <div className="pcard pcard--add" key="add" onClick={handleAddPage}>
        <div className="pcard-thumb">
          <div className="pcard-add-icon">+</div>
        </div>
        <div className="pcard-info">페이지 추가</div>
      </div>
    );

    return rows;
  };

  const renderSingleView = () => (
    <>
      {pages.map((page, i) => (
        <PageCard
          key={page.id}
          page={page}
          displayNum={i + 1}
          isSelected={page.id === selectedId}
          memoContent={getMemo(page.id)}
          projectId={projectId}
          episodeId={episodeId}
          onClick={() => handleSelect(page.id)}
        />
      ))}
      <div className="pcard pcard--add" onClick={handleAddPage}>
        <div className="pcard-thumb">
          <div className="pcard-add-icon">+</div>
        </div>
        <div className="pcard-info">페이지 추가</div>
      </div>
    </>
  );

  return (
    <div className={`pg-nav${collapsed ? " collapsed" : ""}`}>
      <div className="pg-nav-topbar">
        <div
          className="pg-nav-toggle"
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? "펼치기" : "접기"}
        >
          <img
            src={
              collapsed
                ? "/src/assets/images/keyboard_arrow_right_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
                : "/src/assets/images/keyboard_double_arrow_left_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
            }
            alt={collapsed ? "펼치기" : "접기"}
          />
        </div>
      </div>

      <div className="pg-nav-mini">
        {pages.map((page, i) => (
          <button
            key={page.id}
            className={`pg-nav-mini-btn${page.id === selectedId ? " on" : ""}`}
            title={`${i + 1}p`}
            onClick={() => handleSelect(page.id)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div
        className="pg-grid-wrap"
        style={{ transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined, transformOrigin: "top center" }}
      >
        <div className={`pg-grid${viewMode === "single" ? " single" : ""}`}>
          {viewMode === "spread" ? renderSpreadView() : renderSingleView()}
        </div>
      </div>

      <div className="pg-toolbar">
        <div className="pg-view-tgl">
          <button
            className={`pg-view-btn${viewMode === "spread" ? " on" : ""}`}
            onClick={() => setViewMode("spread")}
          >
            <img
              src="/src/assets/images/view_column_2_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
              alt=""
            />
            양면
          </button>
          <button
            className={`pg-view-btn${viewMode === "single" ? " on" : ""}`}
            onClick={() => setViewMode("single")}
          >
            <img
              src="/src/assets/images/grid_view_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
              alt=""
            />
            단면
          </button>
        </div>
        <div className="pg-zoom">
          <button className="pg-zoom-btn" onClick={() => handleZoom(-10)}>
            −
          </button>
          <span className="pg-zoom-pct">{zoom}%</span>
          <button className="pg-zoom-btn" onClick={() => handleZoom(10)}>
            +
          </button>
          <button
            className="pg-zoom-btn"
            onClick={() => setZoom(100)}
            title="맞춤"
          >
            <img
              src="/src/assets/images/fit_screen_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}
