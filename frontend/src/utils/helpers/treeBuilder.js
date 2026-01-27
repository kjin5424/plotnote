// 즐겨찾기, 내 책장, 공유 책장을 전체 트리 노드로 변환
export const buildTreeData = (
  manhwaData,
  userBookshelves,
  currentUserId,
  uiState,
) => {
  const { bookshelves, projects, episodes, pages } = manhwaData;
  const {
    currentBookshelfId,
    currentProjectId,
    currentEpisodeId,
    currentPageId,
  } = uiState;

  const tree = [];

  // 즐겨찾기(나중에 만들기)
  tree.push({
    id: "favorites",
    name: "즐겨찾기",
    expanded: false,
    children: [],
  });

  // 내 책장
  const personalBookshelves = buildPersonalBookshelves(
    // manhwaData
    bookshelves,
    projects,
    episodes,
    pages,
    // ownedBookshelfIds
    userBookshelves[currentUserId]?.owned || [],
    // currentState
    {
      currentBookshelfId,
      currentProjectId,
      currentEpisodeId,
      currentPageId,
    },
  );

  tree.push({
    id: "personal",
    name: "내 책장",
    expanded: false,
    children: personalBookshelves,
  });

  // 공유 책장(나중에 만들기)
  tree.push({
    id: "shared",
    name: "공유 책장",
    expanded: false,
    children: [],
  });

  return tree;
};

// 개인 책장 목록을 트리 노드로 변환
const buildPersonalBookshelves = (
  bookshelves,
  projects,
  episodes,
  pages,
  ownedBookshelfIds,
  currentState,
) => {
  return ownedBookshelfIds
    .map((bookshelfId) => {
      // 개인이 소유중인 책장 목록을 각각의 책장으로
      const bookshelf = bookshelves[bookshelfId];
      if (!bookshelf) return null;

      // 책장 활성화 여부 확인
      const isActive = currentState.currentBookshelfId === bookshelfId;
      const projectChildren = buildProjects(
        projects,
        episodes,
        pages,
        bookshelf.projectOrder,
        currentState,
      );

      return {
        id: bookshelfId,
        name: bookshelf.title,
        active: isActive && !currentState.currentProjectId,
        expanded: isActive || projectChildren.some((e) => e.expanded),
        children: projectChildren,
      };
    })
    .filter(Boolean);
};

// 프로젝트 목록을 트리 노드로 변환
const buildProjects = (
  projects,
  episodes,
  pages,
  projectOrder,
  currentState,
) => {
  return projectOrder
    .map((projectId) => {
      const project = projects[projectId];
      if (!project) return null;

      const isActive = currentState.currentProjectId === projectId;
      const episodeChildren = buildEpisodes(
        episodes,
        pages,
        project.episodeOrder,
        currentState,
      );

      return {
        id: projectId,
        name: project.title,
        active: isActive && !currentState.currentEpisodeId,
        expanded: isActive || episodeChildren.some((e) => e.expanded),
        children: episodeChildren,
      };
    })
    .filter(Boolean);
};

// 에피소드 목록을 트리 노드로 변환
const buildEpisodes = (episodes, pages, episodeOrder, currentState) => {
  return episodeOrder
    .map((episodeId) => {
      const episode = episodes[episodeId];
      if (!episode) return null;

      const isActive = currentState.currentEpisodeId === episodeId;
      const pageChildren = buildPages(pages, episode.pageOrder, currentState);

      return {
        id: episodeId,
        name: episode.title,
        active: isActive && !currentState.currentPageId,
        expanded: isActive || pageChildren.some((e) => e.active),
        children: pageChildren,
      };
    })
    .filter(Boolean);
};

// 페이지 목록을 트리 노드로 변환
const buildPages = (pages, pageOrder, currentState) => {
  return pageOrder
    .map((pageId, index) => {
      const page = pages[pageId];
      if (!page) return null;

      const isActive = currentState.currentPageId === pageId;

      return {
        id: pageId,
        name: `페이지 ${index + 1}`,
        active: isActive,
        // 페이지는 자식이 없으므로 항상 false
        expanded: false,
        children: [],
      };
    })
    .filter(Boolean);
};
