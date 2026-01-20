// 전역 데이터 상태 (차후 서버 연동 대비)
// "이 유저는 이 데이터에 대해 무엇을 할 수 있는가?"
import { createContext, useContext, useState, useEffect } from "react";
import {
  manhwaData,
  userBookshelves,
  userData,
  initializeStorage,
} from "services/storage/localStorage";
import { errorMsg } from "components/common/errorMessage";

// context 생성
export const DataContext = createContext();

// provider 컴포넌트
export const DataProvider = ({ children }) => {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 상태 초기화
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [bookshelves, setBookshelves] = useState(null); // manhwaData.bookshelves
  const [userBookshelves, setUserBookshelves] = useState(null); // userBookshelves
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [uiState, setUiState] = useState({
    currentBookshelfId: null, // 선택된 책장
    currentProjectId: null, // 선택된 프로젝트
    currentEpisodeId: null, // 선택된 에피소드
    currentPageId: null, // 선택된 페이지
    currentCutId: null, // 선택된 컷
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컴포넌트 마운트 시 localStorage에서 데이터 로드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    // 초기 데이터 설정
    initializeStorage();

    // localStorage에서 유저 정보 로드
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : userData["user-001"];
    setCurrentUserId(user.userId);

    // localStorage에서 책장 데이터 읽기
    const savedManhwaData = localStorage.getItem("manhwaData");
    const data = savedManhwaData ? JSON.parse(savedManhwaData) : manhwaData;
    setBookshelves(data.bookshelves);

    // localStorage에서 사용자별 책장 목록 읽기
    const savedUserCollections = localStorage.getItem("userBookshelves");
    const userBshs = savedUserCollections
      ? JSON.parse(savedUserCollections)
      : userBookshelves;
    setUserBookshelves(userBshs);

    // 현재 유저의 첫 번째 접근 가능한 책장 찾기
    const userBsh = userBshs[user.userId];
    let firstBookshelfId = null;

    if (userBsh) {
      // 소유한 책장이 있으면 그것을 우선
      if (userBsh.owned && userBsh.owned.length > 0) {
        firstBookshelfId = userBsh.owned[0];
      }
      // 없으면 공유받은 책장 중 첫 번째
      else if (userBsh.shared && userBsh.shared.length > 0) {
        firstBookshelfId = userBsh.shared[0].bookshelfId;
      }
    }

    // 현재 책장 아이디 설정
    if (firstBookshelfId && data.bookshelves[firstBookshelfId]) {
      const bookshelf = data.bookshelves[firstBookshelfId];

      // 첫 번째 프로젝트/에피소드 설정
      if (bookshelf.projectOrder && bookshelf.projectOrder.length > 0) {
        const firstProjectId = bookshelf.projectOrder[0];
        const firstProject = bookshelf.projects?.[firstProjectId];
        const firstEpisodeId = firstProject?.episodeOrder?.[0];

        setUiState({
          currentBookshelfId: firstBookshelfId,
          currentProjectId: firstProjectId || null,
          currentEpisodeId: firstEpisodeId || null,
          currentPageId: null,
          currentCutId: null,
        });
      }

      // 권한 설정
      if (bookshelf.permissions) {
        setCurrentPermission(bookshelf.permissions[user.userId] || "readonly");
      }
    }
  }, []);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 데이터 변경 시 localStorage에 저장
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (bookshelves) {
      const manhwaDataToSave = { bookshelves: bookshelves };
      localStorage.setItem("manhwaData", JSON.stringify(manhwaDataToSave));
    }
  }, [bookshelves]);

  useEffect(() => {
    if (userBookshelves) {
      localStorage.setItem("userBookshelves", JSON.stringify(userBookshelves));
    }
  }, [userBookshelves]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 헬퍼 함수: id 기반으로 접근
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const helpers = {
    //--● 책장 관련
    getBookshelf: (bookshelfId = null) => {
<<<<<<< HEAD
      const bid =
        bookshelfId || uiState.currentBookshelfId || currentBookshelfId;
=======
      const bid = bookshelfId || uiState.currentBookshelfId;

>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
      if (!bid) return null;
      return bookshelves?.[bid];
    },
    getCurrentBookshlef: () => {
      return helpers.getBookshelf();
    },
    // 사용자가 접근 가능한 모든 책장 목록 반환
    getAccessibleBookshleves: (userId = currentUserId) => {
      if (!userId || !userBookshelves) return [];
      const userBsh = userBookshelves[userId];
      if (!userBsh) return [];

      const accessible = [];

      // 소유한 책장
      if (userBsh.owned) {
        userBsh.owned.forEach((bookshelfId) => {
          const bookshelf = bookshelves?.[bookshelfId];
          if (bookshelf) {
            accessible.push({
              ...bookshelf,
              permission: "owner",
            });
          }
        });
      }

      // 공유받은 책장
      if (userBsh.shared) {
        userBsh.shared.forEach(({ bookshelfId, permission }) => {
          const bookshelf = bookshelves?.[bookshelfId];
          if (bookshelf) {
            accessible.push({
              ...bookshelf,
              permission,
            });
          }
        });
      }

      return accessible;
    },

    //--● 프로젝트 관련
    getProjects: (bookshelfId = null) => {
      const bookshelf = helpers.getBookshelf(bookshelfId);
      return bookshelf?.projects;
    },
    getProject: (projectId = null, bookshelfId = null) => {
      const pid = projectId || uiState.currentProjectId;
      if (!pid) return null;
      const bookshelf = helpers.getBookshelf(bookshelfId);
      return bookshelf?.projects?.[pid];
    },
    getCurrentProject: () => {
      if (!uiState.currentProjectId) return null;
      return helpers.getProject(uiState.currentProjectId);
    },

    //--● 에피소드 관련
    getEpisodes: (projectId = null, bookshelfId = null) => {
      const project = helpers.getProject(projectId, bookshelfId);
      return project?.episodes;
    },
    getEpisode: (projectId = null, episodeId = null, bookshelfId = null) => {
      const eid = episodeId || uiState.currentEpisodeId;
      if (!eid) return null;
      const pid = projectId || uiState.currentProjectId;
      const project = helpers.getProject(pid, bookshelfId);
      return project?.episodes?.[eid];
    },
    getCurrentEpisode: () => {
      if (!uiState.currentProjectId || !uiState.currentEpisodeId) return null;
      return helpers.getEpisode(
        uiState.currentProjectId,
        uiState.currentEpisodeId,
      );
    },

    //--● 페이지 관련
    getPages: (projectId = null, episodeId = null, bookshelfId = null) => {
      const episode = helpers.getEpisode(projectId, episodeId, bookshelfId);
      return episode?.pages;
    },
    getPage: (
      projectId = null,
      episodeId = null,
      pageId = null,
      bookshelfId = null,
    ) => {
      if (!projectId && !uiState.currentProjectId) return null;
      if (!episodeId && !uiState.currentEpisodeId) return null;
      if (!pageId && !uiState.currentPageId) return null;

      const pid = projectId || uiState.currentProjectId;
      const eid = episodeId || uiState.currentEpisodeId;
      const pageIdToUse = pageId || uiState.currentPageId;

      const episode = helpers.getEpisode(pid, eid, bookshelfId);
      return episode?.pages?.[pageIdToUse];
    },
    getCurrentPage: () => {
      if (
        !uiState.currentProjectId ||
        !uiState.currentEpisodeId ||
        !uiState.currentPageId
      ) {
        return null;
      }
      return helpers.getPage(
        uiState.currentProjectId,
        uiState.currentEpisodeId,
        uiState.currentPageId,
      );
    },

    //--● 컷 관련
    getCuts: (
      projectId = null,
      episodeId = null,
      pageId = null,
      bookshelfId = null,
    ) => {
      const page = helpers.getPage(projectId, episodeId, pageId, bookshelfId);
      return page?.cuts;
    },
    getCut: (
      projectId = null,
      episodeId = null,
      pageId = null,
      cutId = null,
      bookshelfId = null,
    ) => {
      if (!projectId && !uiState.currentProjectId) return null;
      if (!episodeId && !uiState.currentEpisodeId) return null;
      if (!pageId && !uiState.currentPageId) return null;
      if (!cutId && !uiState.currentCutId) return null;

      const pid = projectId || uiState.currentProjectId;
      const eid = episodeId || uiState.currentEpisodeId;
      const pageIdToUse = pageId || uiState.currentPageId;
      const cutIdToUse = cutId || uiState.currentCutId;

      const page = helpers.getPage(pid, eid, pageIdToUse, bookshelfId);
      return page?.cuts?.[cutIdToUse];
    },
    getCurrentCut: () => {
      const {
        currentProjectId,
        currentEpisodeId,
        currentPageId,
        currentCutId,
      } = uiState;
      if (
        !currentProjectId ||
        !currentEpisodeId ||
        !currentPageId ||
        !currentCutId
      ) {
        return null;
      }
      return helpers.getCut(
        currentProjectId,
        currentEpisodeId,
        currentPageId,
        currentCutId,
      );
    },

    // 권한 관련
    getPermission: (bookshelfId = null, userId = currentUserId) => {
      const bookshelf = helpers.getBookshelf(bookshelfId);
      if (!bookshelf || !userId) return null;
      return bookshelf.permissions?.[userId] || null;
    },
    canEdit: (bookshelfId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(bookshelfId, userId);
      return permission === "owner" || permission === "editor";
    },
    isReadonly: (bookshelfId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(bookshelfId, userId);
      return permission === "readonly";
    },
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환 변수 value 선언
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const value = {
    // 원본 상태 값
    bookshelves,
    setBookshelves,
    userBookshelves,
    setUserBookshelves,
    currentUserId,
    setCurrentUserId,
    currentPermission,
    setCurrentPermission,
    uiState,
    setUiState,

    // 헬퍼 함수
    ...helpers,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// useData 커스텀 훅
export default function useData() {
  const context = useContext(DataContext);

  // Context 밖에서 사용하면 에러
  if (!context) {
    throw new Error(errorMsg.contexts["useData 오류"]);
  }

  return context;
}
