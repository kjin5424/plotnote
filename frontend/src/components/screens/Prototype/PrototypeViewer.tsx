import { useState } from "react";
import "./prototype-viewer.scss";

const PROTO_TABS = [
  { id: "bookshelf", label: "책장",     file: "/prototypes/proto-bookshelf.html" },
  { id: "project",   label: "프로젝트", file: "/prototypes/proto-project.html" },
  { id: "episode",   label: "에피소드", file: "/prototypes/proto-episode.html" },
  { id: "page",      label: "페이지",   file: "/prototypes/proto-page.html" },
  { id: "cut",       label: "컷 편집",  file: "/prototypes/proto-cut.html" },
];

export default function PrototypeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bookshelf");

  const current = PROTO_TABS.find((t) => t.id === activeTab)!;

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        className="proto-float-btn"
        onClick={() => setIsOpen(true)}
        title="프로토타입 보기"
        aria-label="프로토타입 보기"
      >
        UI
      </button>

      {/* 뷰어 오버레이 */}
      {isOpen && (
        <div className="proto-overlay" onClick={() => setIsOpen(false)}>
          <div className="proto-panel" onClick={(e) => e.stopPropagation()}>

            {/* 헤더 — 탭 + 닫기 */}
            <div className="proto-panel-header">
              <div className="proto-tabs">
                {PROTO_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`proto-tab ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                className="proto-close"
                onClick={() => setIsOpen(false)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* iframe */}
            <div className="proto-body">
              <iframe
                key={current.file}
                src={current.file}
                title={`프로토타입 — ${current.label}`}
                className="proto-iframe"
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
