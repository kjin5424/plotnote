// LocalStorage 로직
// 데이터 구조: 컬렉션 중심 구조 (한 사용자가 여러 컬렉션 소유 가능, 여러 사용자가 하나의 컬렉션 공유 가능)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● manhwaData : 작품 정보 데이터 (컬렉션 중심)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 구조: { collections: { [collectionId]: { id, ownerId, name, permissions, projects, ... } } }
export const manhwaData = {
  collections: {
    "collection-001": {
      id: "collection-001",
      ownerId: "user-001", // 생성자
      name: "나의 첫 번째 컬렉션",
      permissions: {
        "user-001": "owner", // 소유자
        "user-002": "editor", // 편집 가능
        "user-003": "commentonly", // 코멘트만
        "user-004": "readonly", // 읽기전용
      },
      //--● 프로젝트 목록
      projectOrder: ["initial-project"],
      projects: {
        "initial-project": {
          id: "initial-project",
          name: "Initial Project",
          permissions: {},
          settings: {
            defaultPageCount: 24,
            startPageType: "odd", // 'odd' | 'even'
            readingDirection: "rtl", // 'rtl' | 'ltr'
          },
          //--● 에피소드 목록
          episodeOrder: ["episode-0001"],
          episodes: {
            "episode-0001": {
              id: "episode-0001",
              name: "Initial Episode",
              permissions: {},
              memo: "",
              settings: {
                /* 프로젝트 설정 상속 또는 override */
              },
              //--● 페이지 목록
              pageOrder: ["page-0001"],
              pages: {
                "page-0001": {
                  pageId: "page-0001",
                  pageNumber: 1,
                  permissions: {},
                  memo: "",
                  //--● 컷 목록
                  cutOrder: ["cut-0001"],
                  cuts: {
                    "cut-0001": { cutId: "cut-0001", memo: "", layout: null },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userCollections : 사용자별 접근 가능한 컬렉션 목록
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 구조: { [userId]: { owned: [collectionId], shared: [{ collectionId, permission }] } }
export const userCollections = {
  "user-001": {
    owned: ["collection-001"], // 본인이 소유한 컬렉션
    shared: [], // 다른 사람이 공유한 컬렉션
  },
  "user-002": {
    owned: [],
    shared: [
      { collectionId: "collection-001", permission: "editor" },
    ],
  },
  "user-003": {
    owned: [],
    shared: [
      { collectionId: "collection-001", permission: "commentonly" },
    ],
  },
  "user-004": {
    owned: [],
    shared: [
      { collectionId: "collection-001", permission: "readonly" },
    ],
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
  },
};

// 초기 데이터 설정 (localStorage에 없을 경우에만)
export const initializeStorage = () => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  if (!localStorage.getItem("manhwaData")) {
    localStorage.setItem("manhwaData", JSON.stringify(manhwaData));
  }
  if (!localStorage.getItem("userCollections")) {
    localStorage.setItem("userCollections", JSON.stringify(userCollections));
  }
};

// 하위 호환성을 위한 export (기존 코드와의 호환)
export const collections = manhwaData.collections;