// 핵심 도메인 모델
import type { Permission, EpisodeSettings, ProjectSettings } from "./settings";

// ─ 세부 메모 항목 (label + content 구조, 드래그 순서 변경 가능)
// 예) { label: "세계관메모", content: "..." }
//     { label: "1페이지",   content: "..." }
export interface DetailMemoEntry {
  entryId: string;
  label: string;
  content: string;
}

// ─ 컷 노트 (페이지 화면에서 생성 → 컷 화면에서 드래그로 컷에 배정)
// assignedCutId: null = 풀(미배정), cutId = 해당 컷에 배정됨
export interface CutNote {
  noteId: string;
  pageId: string;
  assignedCutId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookshelf {
  bookshelfId: string;
  ownerId: string;
  title: string;
  projectOrder: string[];
}

export interface Project {
  bookshelfId: string;
  projectId: string;
  title: string;
  thumbnailUrl: string | null;
  isFavorited: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: Record<string, Permission>;
  settings: ProjectSettings;
  projectMemo: string;
  projectDetailMemos: Record<string, DetailMemoEntry>;
  projectDetailMemoOrder: string[];
  episodeOrder: string[];
}

export interface Episode {
  projectId: string;
  episodeId: string;
  title: string;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
  permissions: Record<string, Permission>;
  settings: EpisodeSettings;
  episodeMemo: string;
  episodeDetailMemos: Record<string, DetailMemoEntry>;
  episodeDetailMemoOrder: string[];
  pageOrder: string[];
}

export interface Page {
  episodeId: string;
  pageId: string;
  createdAt: string;
  updatedAt: string;
  pageMemo: string;
  pageDetailMemos: Record<string, DetailMemoEntry>;
  pageDetailMemoOrder: string[];
  cutNoteOrder: string[];  // 이 페이지에 속한 CutNote ID 목록 (풀 순서)
  cutOrder: string[];
}

export type Vertex = [number, number];

export interface Cut {
  pageId: string;
  cutId: string;
  createdAt: string;
  updatedAt: string;
  cutMemo: string;
  cutDetailMemos: Record<string, DetailMemoEntry>;
  cutDetailMemoOrder: string[];
  vertices: Vertex[];
}

export interface ManhwaData {
  bookshelves: Record<string, Bookshelf>;
  projects: Record<string, Project>;
  episodes: Record<string, Episode>;
  pages: Record<string, Page>;
  cuts: Record<string, Cut>;
  cutNotes: Record<string, CutNote>;
}
