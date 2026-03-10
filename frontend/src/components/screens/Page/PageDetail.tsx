import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "contexts/StoreContext";
import type { Memo } from "types/entities";

interface Props {
  pageId: string | null;
  episodeId: string;
  projectId: string;
}

type DetTab = "memo" | "cuts";

export default function PageDetailPanel({ pageId, episodeId, projectId }: Props) {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DetTab>("memo");
  const [memoText, setMemoText] = useState("");

  const page = pageId ? store.pages[pageId] : null;
  const episode = store.episodes[episodeId];

  const pageIndex = episode && page
    ? episode.pageOrder.indexOf(page.id)
    : -1;

  const displayNum = pageIndex + 1;

  const sideLabel = page?.side === "left" ? "좌측" : page?.side === "right" ? "우측" : null;

  const singleMemo: Memo | undefined = pageId
    ? Object.values(store.memos).find(
        (m) =>
          m.parentId === pageId &&
          m.parentType === "PAGE" &&
          m.role === "SINGLE"
      )
    : undefined;

  const detailMemos: Memo[] = pageId
    ? Object.values(store.memos).filter(
        (m) =>
          m.parentId === pageId &&
          m.parentType === "PAGE" &&
          m.role === "DETAIL"
      ).sort((a, b) => a.order.localeCompare(b.order))
    : [];

  const cuts = page
    ? page.cutOrder.map((id) => store.cuts[id]).filter(Boolean)
    : [];

  useEffect(() => {
    setMemoText(singleMemo?.content ?? "");
    setActiveTab("memo");
  }, [pageId, singleMemo?.id]);

  if (!page) {
    return (
      <div className="pg-det">
        <div className="pg-det-placeholder">페이지를 선택하세요</div>
      </div>
    );
  }

  const handleMemoBlur = () => {
    if (singleMemo) {
      if (memoText !== singleMemo.content) {
        dispatch({ type: "UPDATE_MEMO", payload: { id: singleMemo.id, content: memoText } });
      }
    } else if (memoText.trim()) {
      dispatch({
        type: "ADD_MEMO",
        payload: {
          parentId: page.id,
          parentType: "PAGE",
          role: "SINGLE",
          content: memoText,
          order: "a",
          tags: [],
          emoji: null,
        },
      });
    }
  };

  const handleAddDetailMemo = () => {
    dispatch({
      type: "ADD_MEMO",
      payload: {
        parentId: page.id,
        parentType: "PAGE",
        role: "DETAIL",
        content: "",
        order: String(Date.now()),
        tags: [],
        emoji: null,
      },
    });
  };

  const handleDeleteDetailMemo = (id: string) => {
    dispatch({ type: "DELETE_MEMO", payload: { id } });
  };

  const handleDetailMemoBlur = (memo: Memo, value: string) => {
    if (value !== memo.content) {
      dispatch({ type: "UPDATE_MEMO", payload: { id: memo.id, content: value } });
    }
  };

  const getCutMemo = (cutId: string) =>
    Object.values(store.memos).find(
      (m) => m.parentId === cutId && m.parentType === "CUT" && m.role === "SINGLE"
    );

  const handleCutMemoBlur = (cutId: string, value: string) => {
    const existing = getCutMemo(cutId);
    if (existing) {
      if (value !== existing.content) {
        dispatch({ type: "UPDATE_MEMO", payload: { id: existing.id, content: value } });
      }
    } else if (value.trim()) {
      dispatch({
        type: "ADD_MEMO",
        payload: {
          parentId: cutId,
          parentType: "CUT",
          role: "SINGLE",
          content: value,
          order: "a",
          tags: [],
          emoji: null,
        },
      });
    }
  };

  return (
    <div className="pg-det">
      <div className="pg-det-panel">
        <div className="pg-det-hd">
          <div className="pg-det-hd-top">
            <div className="pg-det-ttl">
              <span className="pg-det-num">{displayNum}p</span>
              {sideLabel && (
                <span className="pg-det-side">{sideLabel}</span>
              )}
            </div>
            <div className="pg-det-acts">
              <button
                className="btn"
                onClick={() =>
                  navigate(
                    `/project/${projectId}/episode/${episodeId}/page/${page.id}`
                  )
                }
              >
                컷 편집 →
              </button>
            </div>
          </div>
          <div className="pg-det-tabs">
            <div
              className={`pg-det-tab${activeTab === "memo" ? " on" : ""}`}
              onClick={() => setActiveTab("memo")}
            >
              메모
            </div>
            <div
              className={`pg-det-tab${activeTab === "cuts" ? " on" : ""}`}
              onClick={() => setActiveTab("cuts")}
            >
              컷 메모
            </div>
          </div>
        </div>

        <div className="pg-det-bd">
          {activeTab === "memo" && (
            <>
              <div className="m-sec">
                <div className="m-sec-t">페이지 메모</div>
                <textarea
                  className="m-ta"
                  rows={3}
                  placeholder="이 페이지의 메모를 작성하세요..."
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  onBlur={handleMemoBlur}
                />
              </div>

              <div className="m-sec">
                <div className="m-sec-t">
                  세부 메모
                  <span className="cnt-badge">{detailMemos.length}</span>
                </div>
                <div id="detail-memo-list">
                  {detailMemos.map((memo) => (
                    <div className="pg-detail-memo-item" key={memo.id}>
                      <div className="drag-h">
                        <img
                          src="/src/assets/images/menu_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
                          alt=""
                        />
                      </div>
                      <input
                        className="memo-input"
                        type="text"
                        defaultValue={memo.content}
                        spellCheck={false}
                        onBlur={(e) => handleDetailMemoBlur(memo, e.target.value)}
                      />
                      <button
                        className="pg-detail-memo-del"
                        onClick={() => handleDeleteDetailMemo(memo.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pg-cut-add" onClick={handleAddDetailMemo}>
                  <span>+</span> 세부 메모 추가
                </div>
              </div>
            </>
          )}

          {activeTab === "cuts" && (
            <div className="m-sec">
              <div className="m-sec-t">
                컷 메모
                <span className="cnt-badge">{cuts.length}</span>
              </div>
              <div className="pg-cut-list">
                {cuts.map((cut, i) => {
                  const cutMemo = getCutMemo(cut.id);
                  return (
                    <div
                      key={cut.id}
                      className={`pg-cut-item${cutMemo ? " assigned" : " unassigned"}`}
                    >
                      <div className="drag-h">
                        <img
                          src="/src/assets/images/menu_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg"
                          alt=""
                        />
                      </div>
                      <span className="pg-cut-num">{i + 1}</span>
                      <input
                        className="pg-cut-text"
                        type="text"
                        defaultValue={cutMemo?.content ?? ""}
                        placeholder="컷 메모..."
                        spellCheck={false}
                        onBlur={(e) => handleCutMemoBlur(cut.id, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
              {cuts.length === 0 && (
                <div className="pg-sync-notice">
                  컷 편집 화면에서 컷을 추가하세요
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
