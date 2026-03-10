import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";
import type { EpisodeStatus } from "types/entities";

interface Props {
  episodeId: string | null;
  projectId: string;
}

const STATUS_OPTIONS: { value: EpisodeStatus; label: string }[] = [
  { value: "draft",      label: "예정" },
  { value: "inProgress", label: "진행중" },
  { value: "done",       label: "완료" },
];

type DetTab = "memo" | "pages";

export default function EpisodeDetailPanel({ episodeId, projectId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DetTab>("memo");
  const [titleDraft, setTitleDraft] = useState("");

  const episode = episodeId ? store.episodes[episodeId] : null;
  const pages = episode
    ? episode.pageOrder.map((id) => store.pages[id]).filter(Boolean)
    : [];

  const singleMemo = episodeId
    ? Object.values(store.memos).find(
        (m) =>
          m.parentId === episodeId &&
          m.parentType === "EPISODE" &&
          m.role === "SINGLE"
      )
    : undefined;

  const [memoText, setMemoText] = useState(singleMemo?.content ?? "");

  useEffect(() => {
    if (episode) setTitleDraft(episode.title);
  }, [episodeId]);

  useEffect(() => {
    setMemoText(singleMemo?.content ?? "");
  }, [episodeId, singleMemo?.id]);

  if (!episode) {
    return (
      <div className="det-col">
        <div className="det-placeholder">에피소드를 선택하세요</div>
      </div>
    );
  }

  const episodeIndex = store.projects[projectId]
    ? store.projects[projectId].episodeOrder.indexOf(episode.id) + 1
    : 0;

  const handleTitleBlur = () => {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== episode.title) {
      dispatch({ type: "UPDATE_EPISODE", payload: { id: episode.id, title: trimmed } });
    }
  };

  const handleStatusChange = (value: EpisodeStatus) => {
    dispatch({ type: "UPDATE_EPISODE", payload: { id: episode.id, status: value } });
  };

  const handleMemoBlur = () => {
    if (singleMemo) {
      if (memoText !== singleMemo.content) {
        dispatch({ type: "UPDATE_MEMO", payload: { id: singleMemo.id, content: memoText } });
      }
    } else if (memoText.trim()) {
      dispatch({
        type: "ADD_MEMO",
        payload: {
          parentId: episode.id,
          parentType: "EPISODE",
          role: "SINGLE",
          content: memoText,
          order: "a",
          tags: [],
          emoji: null,
        },
      });
    }
  };

  const handleAddPage = () => {
    dispatch({ type: "ADD_PAGE", payload: { episodeId: episode.id } });
  };

  return (
    <div className="det-col">
      <div className="det-panel">
        {/* ── Detail header ── */}
        <div className="det-hd">
          <div className="det-hd-top">
            <div className="det-hd-left">
              <div className="det-ttl-row">
                <span className="det-ep-num">{episodeIndex}화</span>
                <input
                  className="det-ttl"
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onBlur={handleTitleBlur}
                  spellCheck={false}
                />
                <span className="det-pg-count">{pages.length}p</span>
              </div>
            </div>
            <div className="det-hd-acts">
              <select
                className="det-status-sel"
                value={episode.status}
                data-state={episode.status}
                onChange={(e) => handleStatusChange(e.target.value as EpisodeStatus)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Tab row ── */}
          <div className="det-tab-row">
            <div
              className={`det-tab${activeTab === "memo" ? " on" : ""}`}
              onClick={() => setActiveTab("memo")}
            >
              메모
            </div>
            <div
              className={`det-tab${activeTab === "pages" ? " on" : ""}`}
              onClick={() => setActiveTab("pages")}
            >
              페이지 메모
            </div>
            <div className="det-tab-right">
              <button className="det-add-pg" onClick={handleAddPage}>
                + 페이지 추가
              </button>
            </div>
          </div>
        </div>

        {/* ── Detail body ── */}
        <div className="det-bd">
          {activeTab === "memo" && (
            <div className="m-sec">
              <div className="m-sec-t">에피소드 메모</div>
              <textarea
                className="m-ta"
                rows={4}
                placeholder="에피소드 메모를 입력하세요..."
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                onBlur={handleMemoBlur}
              />
            </div>
          )}

          {activeTab === "pages" && (
            <div className="m-sec">
              <div className="m-sec-t">
                페이지별 메모
                <span className="cnt-badge">{pages.length}</span>
              </div>
              <div className="pm-list">
                {pages.map((page, i) => (
                  <div key={page.id} className="pm-row">
                    <div className="pm-grab">
                      <span /><span /><span />
                    </div>
                    <span
                      className="pm-num"
                      onClick={() =>
                        navigate(
                          `/project/${projectId}/episode/${episodeId}/page/${page.id}`
                        )
                      }
                    >
                      {i + 1}p
                    </span>
                    <input
                      className="memo-input"
                      placeholder="페이지 메모..."
                      defaultValue=""
                      spellCheck={false}
                    />
                  </div>
                ))}
              </div>
              {pages.length === 0 && (
                <div className="pm-add" onClick={handleAddPage}>
                  <span>+</span> 페이지 추가
                </div>
              )}
              <div className="ep-sync-notice">
                이 메모는 페이지 화면의 메모와 연동됩니다
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
