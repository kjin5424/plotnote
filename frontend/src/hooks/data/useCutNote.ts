// CutNote CRUD
// - 페이지 화면에서 노트 생성/삭제/수정/순서 변경
// - 컷 화면에서 특정 컷에 배정 / 배정 해제
import useData from "contexts/DataContext";
import { useCallback } from "react";
import { nanoid } from "nanoid";
import { addToOrder, removeFromOrder, reorder } from "utils/helpers/orderManager";

export function useCutNote(pageId: string) {
  const {
    uiState,
    canEdit,
    pages,
    setPages,
    cutNotes,
    setCutNotes,
    getCutNotes,
  } = useData();
  const { currentProjectId } = uiState;

  const noteList = getCutNotes(pageId);
  const poolNotes = noteList.filter((n) => n.assignedCutId === null);
  const getNotesForCut = (cutId: string) =>
    noteList.filter((n) => n.assignedCutId === cutId);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 노트 추가 (풀에 미배정 상태로 생성)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const addCutNote = useCallback(() => {
    if (!canEdit(currentProjectId)) return;

    const now = new Date().toISOString();
    const noteId = `note-${nanoid(8)}`;
    const newNote = {
      noteId,
      pageId,
      assignedCutId: null,
      content: "",
      createdAt: now,
      updatedAt: now,
    };

    setCutNotes((prev) => ({ ...prev, [noteId]: newNote }));
    setPages((prev) => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        cutNoteOrder: addToOrder(prev[pageId]?.cutNoteOrder ?? [], noteId),
      },
    }));

    return noteId;
  }, [pageId, canEdit, currentProjectId, setCutNotes, setPages]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 노트 삭제
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const deleteCutNote = useCallback(
    (noteId: string) => {
      if (!canEdit(currentProjectId)) return;

      setCutNotes((prev) => {
        const { [noteId]: _, ...rest } = prev;
        return rest;
      });
      setPages((prev) => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          cutNoteOrder: removeFromOrder(prev[pageId]?.cutNoteOrder ?? [], noteId),
        },
      }));
    },
    [pageId, canEdit, currentProjectId, setCutNotes, setPages],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 노트 내용 수정
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const updateCutNote = useCallback(
    (noteId: string, content: string) => {
      if (!canEdit(currentProjectId)) return;

      setCutNotes((prev) => ({
        ...prev,
        [noteId]: {
          ...prev[noteId],
          content,
          updatedAt: new Date().toISOString(),
        },
      }));
    },
    [canEdit, currentProjectId, setCutNotes],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컷에 배정 / 배정 해제
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const assignTocut = useCallback(
    (noteId: string, cutId: string | null) => {
      if (!canEdit(currentProjectId)) return;

      setCutNotes((prev) => ({
        ...prev,
        [noteId]: {
          ...prev[noteId],
          assignedCutId: cutId,
          updatedAt: new Date().toISOString(),
        },
      }));
    },
    [canEdit, currentProjectId, setCutNotes],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 풀 내 순서 변경
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const reorderCutNotes = useCallback(
    (startIndex: number, endIndex: number) => {
      if (!canEdit(currentProjectId)) return;

      setPages((prev) => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          cutNoteOrder: reorder(prev[pageId]?.cutNoteOrder ?? [], startIndex, endIndex),
        },
      }));
    },
    [pageId, canEdit, currentProjectId, setPages],
  );

  return {
    noteList,
    poolNotes,
    getNotesForCut,
    addCutNote,
    deleteCutNote,
    updateCutNote,
    assignTocut,
    reorderCutNotes,
  };
}
