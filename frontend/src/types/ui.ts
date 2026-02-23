// UI 상태 및 Context 타입
import type React from "react";
import type { Bookshelf, Project, Episode, Page, Cut, CutNote } from "./domain";
import type { Permission, Settings } from "./settings";
import type { UserBookshelves } from "./user";

export interface UiState {
  currentBookshelfId: string | null;
  currentProjectId: string | null;
  currentEpisodeId: string | null;
  currentPageId: string | null;
  currentCutId: string | null;
  isSidebarOpen: boolean;
}

export interface DataContextValue {
  // ─ 상태
  bookshelves: Record<string, Bookshelf>;
  setBookshelves: React.Dispatch<React.SetStateAction<Record<string, Bookshelf>>>;
  projects: Record<string, Project>;
  setProjects: React.Dispatch<React.SetStateAction<Record<string, Project>>>;
  episodes: Record<string, Episode>;
  setEpisodes: React.Dispatch<React.SetStateAction<Record<string, Episode>>>;
  pages: Record<string, Page>;
  setPages: React.Dispatch<React.SetStateAction<Record<string, Page>>>;
  cuts: Record<string, Cut>;
  setCuts: React.Dispatch<React.SetStateAction<Record<string, Cut>>>;
  cutNotes: Record<string, CutNote>;
  setCutNotes: React.Dispatch<React.SetStateAction<Record<string, CutNote>>>;
  userBookshelvesList: Record<string, UserBookshelves>;
  setUserBookshelvesList: React.Dispatch<React.SetStateAction<Record<string, UserBookshelves>>>;
  currentUserId: string | null;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string | null>>;
  currentPermission: Permission | null;
  setCurrentPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
  isLoading: boolean;
  uiState: UiState;
  setUiState: React.Dispatch<React.SetStateAction<UiState>>;

  // ─ 데이터 조회 헬퍼
  getBookshelf: (bookshelfId: string) => Bookshelf | null;
  getProject: (projectId: string) => Project | null;
  getEpisode: (episodeId: string) => Episode | null;
  getPage: (pageId: string) => Page | null;
  getCut: (cutId: string) => Cut | null;
  getCutNote: (noteId: string) => CutNote | null;
  getCutNotes: (pageId: string) => CutNote[];
  getProjects: (bookshelfId: string) => Project[];
  getEpisodes: (projectId: string) => Episode[];
  getPages: (episodeId: string) => Page[];
  getCuts: (pageId: string) => Cut[];
  getCurrentBookshelf: () => Bookshelf | null;
  getCurrentProject: () => Project | null;
  getCurrentEpisode: () => Episode | null;
  getCurrentPage: () => Page | null;
  getCurrentCut: () => Cut | null;
  getPermission: (projectId: string, userId?: string) => Permission | null;
  canEdit: (projectId: string | null, userId?: string) => boolean | null;
  isReadonly: (projectId: string | null, userId?: string) => boolean | null;
  getCurrentSettings: () => Settings;
  getSetting: (settingKey: keyof Settings) => Settings[keyof Settings];

  // ─ UiState 변경 헬퍼
  setCurrentBookshelfId: (bookshelfId: string) => void;
  setCurrentProjectId: (projectId: string) => void;
  setCurrentEpisodeId: (episodeId: string) => void;
  setCurrentPageId: (pageId: string) => void;
  setCurrentCutId: (cutId: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  navigateToProject: (projectId: string) => void;
  navigateToEpisode: (episodeId: string) => void;
  navigateToPage: (pageId: string) => void;
}
