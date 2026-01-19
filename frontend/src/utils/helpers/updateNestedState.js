export const updateNestedState = (state, path, updater) => {
  const [head, ...rest] = path;

  if (rest.length === 0) {
    return {
      ...state,
      [head]: typeof updater === "function" ? updater(state[head]) : updater,
    };
  }

  return {
    ...state,
    [head]: updateNestedState(state[head], rest, updater),
  };
};

/*
const addPage = useCallback((pageData = {}) => {
  // ...

  setBookshelves(prev => 
    updateNestedState(
      prev,
      [currentBookshelfId, 'projects', currentProjectId, 'episodes', currentEpisodeId],
      (episode) => ({
        ...episode,
        pageOrder: [...episode.pageOrder, newPageId],
        pages: {
          ...episode.pages,
          [newPageId]: newPage,
        },
      })
    )
  );

  return newPageId;
}, [ ... ]);
*/
