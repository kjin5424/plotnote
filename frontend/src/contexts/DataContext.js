// 전역 데이터 상태 (차후 서버 연동 대비)
// "이 유저는 이 데이터에 대해 무엇을 할 수 있는가?"
import { createContext, useContext, useState, useEffect } from "react";
import {
  manhwaData,
  userBookshelves,
  userData,
  uiState,
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
  const [bookshelves, setBookshelves] = useState({});
  const [projects, setProjects] = useState({});
  const [episodes, setEpisodes] = useState({});
  const [pages, setPages] = useState({});
  const [cuts, setCuts] = useState({});

  const [userBookshelvesList, setUserBookshelvesList] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentPermission, setCurrentPermission] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [uiState, setUiState] = useState({
    // currentBookshelfId: null, // 선택된 책장
    // currentProjectId: null, // 선택된 프로젝트
    // currentEpisodeId: null, // 선택된 에피소드
    // currentPageId: null, // 선택된 페이지
    // currentCutId: null, // 선택된 컷
    currentBookshelfId: "bookshelf-001", // 선택된 책장
    currentProjectId: "initial-project", // 선택된 프로젝트
    currentEpisodeId: "episode-0001", // 선택된 에피소드
    currentPageId: null, // 선택된 페이지
    currentCutId: null, // 선택된 컷
    pageView: "spread",
    spreadStart: "odd",
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컴포넌트 마운트 시 localStorage 및 sessionStroage에서 데이터 로드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    // 초기 데이터 설정
    initializeStorage();

    // localStorage에서 유저 정보 로드
    const savedUser = localStorage.getItem("user") || userData;
    const userObj = savedUser ? JSON.parse(savedUser) : userData["user-001"];
    const user = userObj.userId ? userObj : Object.values(userObj)[0];
    setCurrentUserId(user.userId);

    // localStorage에서 만화 데이터 읽기
    const savedManhwaData = localStorage.getItem("manhwaData");
    const data = savedManhwaData ? JSON.parse(savedManhwaData) : manhwaData;
    setBookshelves(data.bookshelves || {});
    setProjects(data.projects || {});
    setEpisodes(data.episodes || {});
    setPages(data.pages || {});
    setCuts(data.cuts || {});

    // localStorage에서 사용자별 책장 목록 읽기
    const savedUserBookshelves = localStorage.getItem("userBookshelves");
    const userBshs = savedUserBookshelves
      ? JSON.parse(savedUserBookshelves)
      : userBookshelves;
    setUserBookshelvesList(userBshs);

    // 현재 유저의 최초 접근 가능한 책장 찾기
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

    setIsLoading(false);
  }, []);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 데이터 변경 시 localStorage에 저장
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "manhwaData",
        JSON.stringify({
          bookshelves: bookshelves,
          projects: projects,
          episodes: episodes,
          pages: pages,
          cuts: cuts,
        }),
      );
    }
  }, [bookshelves, projects, episodes, pages, cuts, isLoading]);

  useEffect(() => {
    if (userBookshelvesList) {
      localStorage.setItem("userBookshelves", JSON.stringify(userBookshelves));
    }
  }, [userBookshelvesList]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 헬퍼 함수: id 기반으로 접근
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const helpers = {
    // Id로 특정 데이터 가져오기
    getBookshelf: (bookshelfId) => bookshelves[bookshelfId] ?? null,
    getProject: (projectId) => projects[projectId] ?? null,
    getEpisode: (episodeId) => episodes[episodeId] ?? null,
    getPage: (pageId) => pages[pageId] ?? null,
    getCut: (cutId) => cuts[cutId] ?? null,

    // 아이디로 특정 데이터 리스트 가져오기
    getProjects: (bookshelfId) => {
      const shelf = bookshelves[bookshelfId];
      if (!shelf) return [];
      return shelf.projectOrder.map((id) => projects[id]);
    },
    getEpisodes: (projectId) => {
      const project = projects[projectId];
      if (!project) return [];
      return project.episodeOrder.map((id) => episodes[id]);
    },
    getPages: (episodeId) => {
      const episode = episodes[episodeId];
      if (!episode) return [];
      return episode.pageOrder.map((id) => pages[id]);
    },
    getCuts: (pageId) => {
      const page = pages[pageId];
      if (!page) return [];
      return page.cutOrder.map((id) => cuts[id]);
    },

    // 현제 선택된 데이터 가져오기
    getCurrentBookshelf: () => helpers.getBookshelf(uiState.currentBookshelfId),
    getCurrentProject: () => helpers.getProject(uiState.currentProjectId),
    getCurrentEpisode: () => helpers.getEpisode(uiState.currentEpisodeId),
    getCurrentPage: () => helpers.getPage(uiState.currentPageId),
    getCurrentCut: () => helpers.getCut(uiState.currentCutId),

    // 권한 가져오기
    getPermission: (projectId, userId = currentUserId) => {
      const project = helpers.getProject(projectId);
      if (!project || !userId) return null;
      return project.permissions?.[userId] || null;
    },
    // 편집 가능 여부
    canEdit: (projectId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(projectId, userId);
      if (!permission) return null;
      return permission === "owner" || permission === "editor";
    },
    // 읽기 전용 여부
    isReadonly: (projectId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(projectId, userId);
      if (!permission) return null;
      return permission === "readonly";
    },

    // settings 가져오기
    getEffectiveSettings: (projectId, episodeId, userId) => {
      const project = helpers.getProject(projectId);
      const episode = helpers.getEpisode(episodeId);
      const savedUser = localStorage.getItem("user") || userData;
      const userObj = savedUser ? JSON.parse(savedUser) : userData["user-001"];
      const user = userObj.userId ? userObj : Object.values(userObj)[0];
      const globalSettings = user.globalSettings;

      // 우선순위: 에피소드 설정 > 프로젝트 설정 > 사용자 설정 > 기본값
      return {
        defaultPageCount:
          episode.settings?.readingDirection ||
          project.settings.readingDirection ||
          24,
        readingDirection:
          episode.settings?.readingDirection ||
          project.settings.readingDirection ||
          "rtl",

        spreadStart:
          episode.settings?.spreadStart ||
          project.settings.spreadStart ||
          "odd",

        pageView:
          globalSettings.projectSettings?.[projectId]?.pageView ||
          globalSettings.globalSettings.pageView ||
          "spread",

        SidebarOpen: globalSettings.SidebarOpen || "true",
      };
    },
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환 변수 value 선언
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const value = {
    bookshelves,
    setBookshelves,
    projects,
    setProjects,
    episodes,
    setEpisodes,
    pages,
    setPages,
    cuts,
    setCuts,
    userBookshelvesList,
    setUserBookshelvesList,
    currentUserId,
    setCurrentUserId,
    currentPermission,
    setCurrentPermission,
    isLoading,
    uiState,
    setUiState,
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
