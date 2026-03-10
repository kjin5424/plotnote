import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";
import type { EpisodeStatus } from "types/entities";
import EpisodeItem from "./EpisodeItem";

type FilterTab = "all" | EpisodeStatus;

const THUMB_GRADS = [
  "erow-thumb--g1", "erow-thumb--g2", "erow-thumb--g3", "erow-thumb--g4",
  "erow-thumb--g5", "erow-thumb--g6", "erow-thumb--g7",
];

interface Props {
  projectId: string;
  selectedId: string | null;
}

export default function EpisodeNav({ projectId, selectedId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [sortAsc, setSortAsc] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const project = store.projects[projectId];
  const allEpisodes = project
    ? project.episodeOrder.map((id) => store.episodes[id]).filter(Boolean)
    : [];

  const filtered = allEpisodes.filter(
    (ep) => filter === "all" || ep.status === filter
  );
  const sorted = sortAsc ? filtered : [...filtered].reverse();

  const counts = {
    all: allEpisodes.length,
    inProgress: allEpisodes.filter((e) => e.status === "inProgress").length,
    done: allEpisodes.filter((e) => e.status === "done").length,
    draft: allEpisodes.filter((e) => e.status === "draft").length,
  };

  const handleAddEpisode = () => {
    dispatch({ type: "ADD_EPISODE", payload: { projectId, title: "새 에피소드" } });
  };

  const handleSelect = (id: string) => {
    navigate(`/project/${projectId}/episode/${id}`);
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all",        label: "전체",   count: counts.all },
    { key: "inProgress", label: "진행중", count: counts.inProgress },
    { key: "done",       label: "완료",   count: counts.done },
    { key: "draft",      label: "예정",   count: counts.draft },
  ];

  return (
    <div className={`ep-nav${collapsed ? " collapsed" : ""}`}>
      {/* ── Mini view (collapsed) ── */}
      <div className="ep-nav-mini">
        <button
          className="ep-nav-tgl"
          onClick={() => setCollapsed(false)}
          title="네비게이터 펼치기"
        >
          <img
            src="/src/assets/images/keyboard_arrow_right_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
            alt="펼치기"
          />
        </button>
        {allEpisodes.map((ep, i) => (
          <button
            key={ep.id}
            className={`ep-mini-badge${ep.id === selectedId ? " on" : ""}`}
            title={`${i + 1}화 ${ep.title}`}
            onClick={() => handleSelect(ep.id)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ── Full content ── */}
      <div className="ep-nav-content">
        <div className="ep-nav-hd">
          <div className="ep-nav-top">
            <span className="ep-nav-ttl">에피소드</span>
            <div className="ep-nav-acts">
              <button
                className="sort-tgl"
                onClick={() => setSortAsc((v) => !v)}
                title="정렬 순서 변경"
              >
                <img
                  src={
                    sortAsc
                      ? "/src/assets/images/sort-ascending-svgrepo-com.svg"
                      : "/src/assets/images/sort-descending-svgrepo-com.svg"
                  }
                  alt={sortAsc ? "오름차순" : "내림차순"}
                />
              </button>
              <button
                className="ep-nav-tgl"
                onClick={() => setCollapsed(true)}
                title="네비게이터 접기"
              >
                <img
                  src="/src/assets/images/keyboard_double_arrow_left_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
                  alt="접기"
                />
              </button>
            </div>
          </div>
          <div className="ep-tabs">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`ep-tab${filter === tab.key ? " on" : ""}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
                <span className="ep-tab-count">{tab.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ep-list">
          {!sortAsc && (
            <div className="ep-add" onClick={handleAddEpisode}>
              <span>+</span> 에피소드 추가
            </div>
          )}
          {sorted.map((ep) => {
            const originalIndex = allEpisodes.indexOf(ep);
            const singleMemo = Object.values(store.memos).find(
              (m) =>
                m.parentId === ep.id &&
                m.parentType === "EPISODE" &&
                m.role === "SINGLE"
            );
            return (
              <EpisodeItem
                key={ep.id}
                episode={ep}
                displayNum={originalIndex + 1}
                gradClass={THUMB_GRADS[originalIndex % THUMB_GRADS.length]}
                isSelected={ep.id === selectedId}
                singleMemoContent={singleMemo?.content ?? ""}
                onClick={() => handleSelect(ep.id)}
              />
            );
          })}
          {sortAsc && (
            <div className="ep-add" onClick={handleAddEpisode}>
              <span>+</span> 에피소드 추가
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
