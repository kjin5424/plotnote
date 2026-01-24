// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● manhwaData : 작품 정보 데이터 (컬렉션 중심)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const manhwaData = {
  bookshelves: {
    "bookshelf-001": {
      bookshelfId: "bookshelf-001",
      ownerId: "user-001", // 생성자
      title: "나의 첫 번째 컬렉션",
      projectOrder: ["initial-project"],
    },
  },

  projects: {
    "initial-project": {
      bookshelfId: "bookshelf-001",
      projectId: "initial-project",
      title: "Initial Project",
      permissions: {
        "user-001": "owner", // 소유자
        "user-002": "editor", // 편집 가능
        "user-003": "commentonly", // 코멘트만
        "user-004": "readonly", // 읽기전용
      },
      settings: {
        defaultPageCount: 24,
        spreadStart: "odd", // 'odd' | 'even'
        readingDirection: "rtl", // 'rtl' | 'ltr'
        pageView: "spread",
        cutGridUnit: 8,
      },
      projectMemo: "",
      episodeOrder: ["episode-0001"],
    },
  },
  episodes: {
    "episode-0001": {
      projectId: "initial-project",
      episodeId: "episode-0001",
      title: "Initial Episode",
      permissions: {},
      memo: "",
      settings: {
        /* 프로젝트 설정 상속 또는 override */
        // 값이 있으면 이 에피소드만 다르게 설정
        defaultPageCount: null,
        spreadStart: null,
        readingDirection: null,
        pageView: null,
      },
      episodeMemo: "",
      pageOrder: ["page-0001"],
    },
  },
  pages: {
    "page-0001": {
      episodeId: "episode-0001",
      pageId: "page-0001",
      pageMemo: "",
      cutOrder: ["cut-0001"],
    },
  },
  cuts: {
    "cut-0001": {
      pageId: "page-0001",
      cutId: "cut-0001",
      cutMemo: "",
      layout: null,
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userBookshelves : 사용자별 접근 가능한 컬렉션 목록
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const userBookshelves = {
  "user-001": {
    owned: ["bookshelf-001"], // 본인이 소유한 컬렉션
    shared: [], // 다른 사람이 공유한 컬렉션
  },
  "user-002": {
    owned: [],
    shared: [{ collectionId: "bookshelf-001", permission: "editor" }],
  },
  "user-003": {
    owned: [],
    shared: [{ collectionId: "bookshelf-001", permission: "commentonly" }],
  },
  "user-004": {
    owned: [],
    shared: [{ collectionId: "bookshelf-001", permission: "readonly" }],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userData : 유저 정보 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const userData = {
  "user-001": {
    userId: "user-001",
    displayName: "베베",
    email: "kjin5424@gmail.com",
    globalSettings: {
      readingDirection: "rtl",
      spreadStart: "odd",
      pageView: "spread",
      SidebarOpen: true,
      // theme: "light",
      // gridColumns: 5,
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● uiState : 유저 정보 데이터
//             서버 저장 Ⅹ
//             새로고침 시 복원 용 등
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const uiState = {
  currentBookshelfId: "bookshelf-001", // 선택된 책장
  currentProjectId: "initial-project", // 선택된 프로젝트
  currentEpisodeId: "episode-0001", // 선택된 에피소드
  currentPageId: null, // 선택된 페이지
  currentCutId: null, // 선택된 컷
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 초기 데이터 설정 (localStorage에 없을 경우에만)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const initializeStorage = () => {
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
