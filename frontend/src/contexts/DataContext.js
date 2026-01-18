// 전역 데이터 상태 (차후 서버 연동 대비)
// "이 유저는 이 데이터에 대해 무엇을 할 수 있는가?"
import { createContext, useContext, useState, useEffect } from "react";
import { manhwaData, userCollections, userData, initializeStorage } from "../services/storage/localStorage";
import { errorMsg } from "../components/common/errorMessage";

// context 생성
export const DataContext = createContext();

// provider 컴포넌트
export const DataProvider = ({ children }) => {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 상태 초기화
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [collectionsData, setCollectionsData] = useState(null); // manhwaData.collections
  const [userCollectionsData, setUserCollectionsData] = useState(null); // userCollections
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentCollectionId, setCurrentCollectionId] = useState(null); // 현재 선택된 컬렉션
  const [currentPermission, setCurrentPermission] = useState(null);
  const [uiState, setUiState] = useState({
    currentCollectionId: null, // 선택된 컬렉션
    currentProjectId: null, // 선택된 프로젝트
    currentEpisodeId: null, // 선택된 에피소드
    currentPageId: null, // 선택된 페이지
    currentCutId: null, // 선택된 컷
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컴포넌트 마운트 시 localStorage에서 데이터 로드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    // 초기 데이터 설정 (localStorage에 없을 경우에만)
    initializeStorage();

    // localStorage에서 유저 정보 로드
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : userData["user-001"];
    setCurrentUserId(user.userId);

    // localStorage에서 컬렉션 데이터 읽기
    const savedManhwaData = localStorage.getItem("manhwaData");
    const data = savedManhwaData ? JSON.parse(savedManhwaData) : manhwaData;
    setCollectionsData(data.collections);

    // localStorage에서 사용자별 컬렉션 목록 읽기
    const savedUserCollections = localStorage.getItem("userCollections");
    const userCols = savedUserCollections ? JSON.parse(savedUserCollections) : userCollections;
    setUserCollectionsData(userCols);

    // 현재 유저의 첫 번째 접근 가능한 컬렉션 찾기
    const userCol = userCols[user.userId];
    let firstCollectionId = null;
    
    if (userCol) {
      // 소유한 컬렉션이 있으면 그것을 우선
      if (userCol.owned && userCol.owned.length > 0) {
        firstCollectionId = userCol.owned[0];
      } 
      // 없으면 공유받은 컬렉션 중 첫 번째
      else if (userCol.shared && userCol.shared.length > 0) {
        firstCollectionId = userCol.shared[0].collectionId;
      }
    }

    if (firstCollectionId && data.collections[firstCollectionId]) {
      const collection = data.collections[firstCollectionId];
      setCurrentCollectionId(firstCollectionId);
      
      // 첫 번째 프로젝트/에피소드 설정
      if (collection.projectOrder && collection.projectOrder.length > 0) {
        const firstProjectId = collection.projectOrder[0];
        const firstProject = collection.projects?.[firstProjectId];
        const firstEpisodeId = firstProject?.episodeOrder?.[0];

        setUiState({
          currentCollectionId: firstCollectionId,
          currentProjectId: firstProjectId || null,
          currentEpisodeId: firstEpisodeId || null,
          currentPageId: null,
          currentCutId: null,
        });
      }

      // 권한 설정
      if (collection.permissions) {
        setCurrentPermission(collection.permissions[user.userId] || "readonly");
      }
    }
  }, []);

  // 차후 서버 요청 시 아래 함수 사용
  const loadCollectionsData = async (userId) => {
    const response = await fetch(`/api/collections/my-collections`);
    const data = await response.json();

    setCollectionsData(data.collections);
    setUserCollectionsData(data.userCollections);

    // 현재 유저의 권한 계산
    const firstCollectionId = data.userCollections[userId]?.owned?.[0] || 
                             data.userCollections[userId]?.shared?.[0]?.collectionId;
    if (firstCollectionId) {
      const permission = data.collections[firstCollectionId]?.permissions?.[userId];
      setCurrentPermission(permission || "readonly");
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 데이터 변경 시 localStorage에 저장
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (collectionsData) {
      const manhwaDataToSave = { collections: collectionsData };
      localStorage.setItem("manhwaData", JSON.stringify(manhwaDataToSave));
    }
  }, [collectionsData]);

  useEffect(() => {
    if (userCollectionsData) {
      localStorage.setItem("userCollections", JSON.stringify(userCollectionsData));
    }
  }, [userCollectionsData]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 헬퍼 함수: id 기반으로 접근
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const helpers = {
    //--● 컬렉션 관련
    getCollection: (collectionId = null) => {
      const cid = collectionId || uiState.currentCollectionId || currentCollectionId;
      if (!cid) return null;
      return collectionsData?.[cid];
    },
    getCurrentCollection: () => {
      return helpers.getCollection();
    },
    // 사용자가 접근 가능한 모든 컬렉션 목록 반환
    getAccessibleCollections: (userId = currentUserId) => {
      if (!userId || !userCollectionsData) return [];
      const userCol = userCollectionsData[userId];
      if (!userCol) return [];

      const accessible = [];
      
      // 소유한 컬렉션
      if (userCol.owned) {
        userCol.owned.forEach(collectionId => {
          const collection = collectionsData?.[collectionId];
          if (collection) {
            accessible.push({
              ...collection,
              permission: "owner",
            });
          }
        });
      }

      // 공유받은 컬렉션
      if (userCol.shared) {
        userCol.shared.forEach(({ collectionId, permission }) => {
          const collection = collectionsData?.[collectionId];
          if (collection) {
            accessible.push({
              ...collection,
              permission,
            });
          }
        });
      }

      return accessible;
    },

    //--● 프로젝트 관련
    getProjects: (collectionId = null) => {
      const collection = helpers.getCollection(collectionId);
      return collection?.projects;
    },
    getProject: (projectId = null, collectionId = null) => {
      const pid = projectId || uiState.currentProjectId;
      if (!pid) return null;
      const collection = helpers.getCollection(collectionId);
      return collection?.projects?.[pid];
    },
    getCurrentProject: () => {
      if (!uiState.currentProjectId) return null;
      return helpers.getProject(uiState.currentProjectId);
    },

    //--● 에피소드 관련
    getEpisodes: (projectId = null, collectionId = null) => {
      const project = helpers.getProject(projectId, collectionId);
      return project?.episodes;
    },
    getEpisode: (projectId = null, episodeId = null, collectionId = null) => {
      const eid = episodeId || uiState.currentEpisodeId;
      if (!eid) return null;
      const pid = projectId || uiState.currentProjectId;
      const project = helpers.getProject(pid, collectionId);
      return project?.episodes?.[eid];
    },
    getCurrentEpisode: () => {
      if (!uiState.currentProjectId || !uiState.currentEpisodeId) return null;
      return helpers.getEpisode(uiState.currentProjectId, uiState.currentEpisodeId);
    },

    //--● 페이지 관련
    getPages: (projectId = null, episodeId = null, collectionId = null) => {
      const episode = helpers.getEpisode(projectId, episodeId, collectionId);
      return episode?.pages;
    },
    getPage: (projectId = null, episodeId = null, pageId = null, collectionId = null) => {
      if (!projectId && !uiState.currentProjectId) return null;
      if (!episodeId && !uiState.currentEpisodeId) return null;
      if (!pageId && !uiState.currentPageId) return null;
      
      const pid = projectId || uiState.currentProjectId;
      const eid = episodeId || uiState.currentEpisodeId;
      const pageIdToUse = pageId || uiState.currentPageId;
      
      const episode = helpers.getEpisode(pid, eid, collectionId);
      return episode?.pages?.[pageIdToUse];
    },
    getCurrentPage: () => {
      if (!uiState.currentProjectId || !uiState.currentEpisodeId || !uiState.currentPageId) {
        return null;
      }
      return helpers.getPage(uiState.currentProjectId, uiState.currentEpisodeId, uiState.currentPageId);
    },

    //--● 컷 관련
    getCuts: (projectId = null, episodeId = null, pageId = null, collectionId = null) => {
      const page = helpers.getPage(projectId, episodeId, pageId, collectionId);
      return page?.cuts;
    },
    getCut: (projectId = null, episodeId = null, pageId = null, cutId = null, collectionId = null) => {
      if (!projectId && !uiState.currentProjectId) return null;
      if (!episodeId && !uiState.currentEpisodeId) return null;
      if (!pageId && !uiState.currentPageId) return null;
      if (!cutId && !uiState.currentCutId) return null;

      const pid = projectId || uiState.currentProjectId;
      const eid = episodeId || uiState.currentEpisodeId;
      const pageIdToUse = pageId || uiState.currentPageId;
      const cutIdToUse = cutId || uiState.currentCutId;

      const page = helpers.getPage(pid, eid, pageIdToUse, collectionId);
      return page?.cuts?.[cutIdToUse];
    },
    getCurrentCut: () => {
      const { currentProjectId, currentEpisodeId, currentPageId, currentCutId } = uiState;
      if (!currentProjectId || !currentEpisodeId || !currentPageId || !currentCutId) {
        return null;
      }
      return helpers.getCut(currentProjectId, currentEpisodeId, currentPageId, currentCutId);
    },

    // 권한 관련
    getPermission: (collectionId = null, userId = currentUserId) => {
      const collection = helpers.getCollection(collectionId);
      if (!collection || !userId) return null;
      return collection.permissions?.[userId] || null;
    },
    canEdit: (collectionId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(collectionId, userId);
      return permission === "owner" || permission === "editor";
    },
    isReadonly: (collectionId = null, userId = currentUserId) => {
      const permission = helpers.getPermission(collectionId, userId);
      return permission === "readonly";
    },
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환 변수 value 선언
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const value = {
    // 원본 상태 값
    collectionsData,
    setCollectionsData,
    userCollectionsData,
    setUserCollectionsData,
    currentUserId,
    setCurrentUserId,
    currentCollectionId,
    setCurrentCollectionId,
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