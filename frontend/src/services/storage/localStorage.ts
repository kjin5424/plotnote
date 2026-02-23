import DEFAULT_SETTINGS from "../../Setting";
import type {
  ManhwaData,
  UserBookshelves,
  User,
  UiState,
} from "types/models";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● manhwaData : 작품 정보 데이터 (컬렉션 중심)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const manhwaData: ManhwaData = {
  bookshelves: {
    "bookshelf-001": {
      bookshelfId: "bookshelf-001",
      ownerId: "user-001",
      title: "나의 첫 번째 컬렉션",
      projectOrder: ["initial-project"],
    },
  },

  projects: {
    "initial-project": {
      bookshelfId: "bookshelf-001",
      projectId: "initial-project",
      title: "Initial Project",
      thumbnailUrl: null,
      isFavorited: false,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
      permissions: {
        "user-001": "owner",
        "user-002": "editor",
        "user-003": "commentonly",
        "user-004": "readonly",
      },
      settings: {
        defaultPageCount: DEFAULT_SETTINGS.defaultPageCount,
        spreadStart: DEFAULT_SETTINGS.spreadStart,
        readingDirection: DEFAULT_SETTINGS.readingDirection,
        pageView: DEFAULT_SETTINGS.pageView,
        cutGridUnit: 8,
      },
      projectMemo: "",
      projectDetailMemos: {},
      projectDetailMemoOrder: [],
      episodeOrder: ["episode-0001"],
    },
  },

  episodes: {
    "episode-0001": {
      projectId: "initial-project",
      episodeId: "episode-0001",
      title: "Initial Episode",
      thumbnailUrl: null,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
      permissions: {},
      settings: {
        // 값이 있으면 이 에피소드만 다르게 설정 (null = 프로젝트 설정 상속)
        defaultPageCount: null,
        spreadStart: null,
        readingDirection: null,
        pageView: null,
      },
      episodeMemo: "",
      episodeDetailMemos: {},
      episodeDetailMemoOrder: [],
      pageOrder: ["page-0001"],
    },
  },

  pages: {
    "page-0001": {
      episodeId: "episode-0001",
      pageId: "page-0001",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
      pageMemo: "",
      pageDetailMemos: {},
      pageDetailMemoOrder: [],
      cutNoteOrder: [],
      cutOrder: [],
    },
  },

  cuts: {},
  cutNotes: {},
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userBookshelves : 사용자별 접근 가능한 컬렉션 목록
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const userBookshelves: Record<string, UserBookshelves> = {
  "user-001": {
    owned: ["bookshelf-001"],
    shared: [],
  },
  "user-002": {
    owned: [],
    shared: [{ bookshelfId: "bookshelf-001", permission: "editor" }],
  },
  "user-003": {
    owned: [],
    shared: [{ bookshelfId: "bookshelf-001", permission: "commentonly" }],
  },
  "user-004": {
    owned: [],
    shared: [{ bookshelfId: "bookshelf-001", permission: "readonly" }],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userData : 유저 정보 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const userData: Record<string, User> = {
  "user-001": {
    userId: "user-001",
    displayName: "베베",
    email: "kjin5424@gmail.com",
    globalSettings: {
      readingDirection: "rtl",
      spreadStart: "odd",
      pageView: "spread",
      SidebarOpen: false,
    },
    favoritedProjectIds: [],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● uiState : 클라이언트 전용 UI 상태 (서버 저장 X)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const uiState: UiState = {
  currentBookshelfId: "bookshelf-001",
  currentProjectId: null,
  currentEpisodeId: null,
  currentPageId: null,
  currentCutId: null,
  isSidebarOpen: true,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 초기 데이터 설정 (localStorage에 없을 경우에만)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const initializeStorage = (): void => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  if (!localStorage.getItem("manhwaData")) {
    localStorage.setItem("manhwaData", JSON.stringify(manhwaData));
  }
  if (!localStorage.getItem("userBookshelves")) {
    localStorage.setItem("userBookshelves", JSON.stringify(userBookshelves));
  }
  if (!sessionStorage.getItem("uiState")) {
    sessionStorage.setItem("uiState", JSON.stringify(uiState));
  }
};
