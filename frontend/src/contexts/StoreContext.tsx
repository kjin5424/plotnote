import {
  createContext,
  useContext,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import { nanoid } from 'nanoid';
import type { NormalizedStore } from 'types/store';
import type {
  CutFrame,
  Memo,
  ScriptSnippet,
  Project,
  Episode,
  Page,
} from 'types/entities';
import type { UiState } from 'types/ui';

// ── Helpers ────────────────────────────────────────────────────────────────

const now = () => new Date().toISOString();

const INITIAL_STORE: NormalizedStore = {
  bookshelves:    {},
  projects:       {},
  episodes:       {},
  pages:          {},
  cuts:           {},
  memos:          {},
  scriptSnippets: {},
  assets:         {},
};

const INITIAL_UI: UiState = {
  currentBookshelfId: null,
  currentProjectId:   null,
  currentEpisodeId:   null,
  currentPageId:      null,
  currentCutId:       null,
  isSidebarOpen:      true,
};

// ── Action Types ───────────────────────────────────────────────────────────

export type Action =
  | { type: 'LOAD_STORE';         payload: NormalizedStore }
  // Bookshelf
  | { type: 'ADD_BOOKSHELF';      payload: { title: string; ownerId: string } }
  // Project
  | { type: 'ADD_PROJECT';        payload: { bookshelfId: string; title: string } }
  | { type: 'UPDATE_PROJECT';     payload: { id: string } & Partial<Pick<Project, 'title' | 'coverImageAssetId' | 'isFavorited' | 'settings'>> }
  | { type: 'DELETE_PROJECT';     payload: { id: string } }
  | { type: 'REORDER_PROJECTS';   payload: { bookshelfId: string; newOrder: string[] } }
  // Episode
  | { type: 'ADD_EPISODE';        payload: { projectId: string; title: string } }
  | { type: 'UPDATE_EPISODE';     payload: { id: string } & Partial<Pick<Episode, 'title' | 'thumbnailUrl' | 'status' | 'deadline' | 'settings'>> }
  | { type: 'DELETE_EPISODE';     payload: { id: string } }
  | { type: 'REORDER_EPISODES';   payload: { projectId: string; newOrder: string[] } }
  // Page
  | { type: 'ADD_PAGE';           payload: { episodeId: string; pageType?: Page['pageType'] } }
  | { type: 'UPDATE_PAGE';        payload: { id: string } & Partial<Pick<Page, 'pageType' | 'side'>> }
  | { type: 'DELETE_PAGE';        payload: { id: string } }
  | { type: 'REORDER_PAGES';      payload: { episodeId: string; newOrder: string[] } }
  // Cut
  | { type: 'ADD_CUT';            payload: { pageId: string; frame: CutFrame } }
  | { type: 'UPDATE_CUT_FRAME';   payload: { id: string; frame: CutFrame } }
  | { type: 'DELETE_CUT';         payload: { id: string } }
  | { type: 'REORDER_CUTS';       payload: { pageId: string; newOrder: string[] } }
  // Memo
  | { type: 'ADD_MEMO';           payload: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_MEMO';        payload: { id: string } & Partial<Pick<Memo, 'content' | 'order' | 'tags' | 'emoji'>> }
  | { type: 'DELETE_MEMO';        payload: { id: string } }
  | { type: 'ASSIGN_CUT_MEMO';    payload: { id: string; cutId: string } }
  | { type: 'UNASSIGN_CUT_MEMO';  payload: { id: string } }
  // ScriptSnippet
  | { type: 'ADD_SCRIPT';         payload: Omit<ScriptSnippet, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_SCRIPT';      payload: { id: string } & Partial<Pick<ScriptSnippet, 'content' | 'order' | 'type' | 'speakerId'>> }
  | { type: 'DELETE_SCRIPT';      payload: { id: string } }
  | { type: 'ASSIGN_SCRIPT';      payload: { id: string; cutId: string } }
  | { type: 'UNASSIGN_SCRIPT';    payload: { id: string } };

// ── Cascade Helpers ────────────────────────────────────────────────────────

function withCutDeleted(s: NormalizedStore, cutId: string, ts: string): NormalizedStore {
  if (!s.cuts[cutId]) return s;
  const { [cutId]: _, ...cuts } = s.cuts;
  return {
    ...s,
    cuts,
    memos: Object.fromEntries(
      Object.entries(s.memos).map(([id, m]) =>
        m.parentType === 'CUT' && m.parentId === cutId
          ? [id, { ...m, parentId: null, updatedAt: ts }]
          : [id, m]
      )
    ),
    scriptSnippets: Object.fromEntries(
      Object.entries(s.scriptSnippets).map(([id, sn]) =>
        sn.cutId === cutId ? [id, { ...sn, cutId: null, updatedAt: ts }] : [id, sn]
      )
    ),
  };
}

function withPageDeleted(s: NormalizedStore, pageId: string, ts: string): NormalizedStore {
  const page = s.pages[pageId];
  if (!page) return s;
  const afterCuts = page.cutOrder.reduce((acc, cutId) => withCutDeleted(acc, cutId, ts), s);
  const { [pageId]: _, ...pages } = afterCuts.pages;
  return {
    ...afterCuts,
    pages,
    memos: Object.fromEntries(
      Object.entries(afterCuts.memos).filter(
        ([, m]) => !(m.parentType === 'PAGE' && m.parentId === pageId)
      )
    ),
    scriptSnippets: Object.fromEntries(
      Object.entries(afterCuts.scriptSnippets).filter(([, sn]) => sn.pageId !== pageId)
    ),
  };
}

function withEpisodeDeleted(s: NormalizedStore, episodeId: string, ts: string): NormalizedStore {
  const episode = s.episodes[episodeId];
  if (!episode) return s;
  const afterPages = episode.pageOrder.reduce((acc, pageId) => withPageDeleted(acc, pageId, ts), s);
  const { [episodeId]: _, ...episodes } = afterPages.episodes;
  return {
    ...afterPages,
    episodes,
    memos: Object.fromEntries(
      Object.entries(afterPages.memos).filter(
        ([, m]) => !(m.parentType === 'EPISODE' && m.parentId === episodeId)
      )
    ),
  };
}

// ── Reducer ────────────────────────────────────────────────────────────────

function storeReducer(state: NormalizedStore, action: Action): NormalizedStore {
  switch (action.type) {

    case 'LOAD_STORE':
      return action.payload;

    case 'ADD_BOOKSHELF': {
      const id = nanoid(); const ts = now();
      return {
        ...state,
        bookshelves: {
          ...state.bookshelves,
          [id]: { id, ownerId: action.payload.ownerId, title: action.payload.title, projectOrder: [], createdAt: ts, updatedAt: ts },
        },
      };
    }

    case 'ADD_PROJECT': {
      const id = nanoid(); const ts = now();
      const { bookshelfId, title } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [id]: {
            id, bookshelfId, title, coverImageAssetId: null, isFavorited: false,
            permissions: {},
            settings: { defaultPageCount: null, spreadStart: null, readingDirection: null, pageView: null, cutGridUnit: 5 },
            episodeOrder: [], createdAt: ts, updatedAt: ts,
          },
        },
        bookshelves: {
          ...state.bookshelves,
          [bookshelfId]: {
            ...state.bookshelves[bookshelfId],
            projectOrder: [...state.bookshelves[bookshelfId].projectOrder, id],
            updatedAt: ts,
          },
        },
      };
    }

    case 'UPDATE_PROJECT': {
      const { id, ...patch } = action.payload; const ts = now();
      return { ...state, projects: { ...state.projects, [id]: { ...state.projects[id], ...patch, updatedAt: ts } } };
    }

    case 'DELETE_PROJECT': {
      const { id } = action.payload;
      const project = state.projects[id];
      if (!project) return state;
      const ts = now();
      const afterEpisodes = project.episodeOrder.reduce((acc, epId) => withEpisodeDeleted(acc, epId, ts), state);
      const { [id]: _, ...projects } = afterEpisodes.projects;
      return {
        ...afterEpisodes,
        projects,
        bookshelves: {
          ...afterEpisodes.bookshelves,
          [project.bookshelfId]: {
            ...afterEpisodes.bookshelves[project.bookshelfId],
            projectOrder: afterEpisodes.bookshelves[project.bookshelfId].projectOrder.filter(pid => pid !== id),
            updatedAt: ts,
          },
        },
        memos: Object.fromEntries(
          Object.entries(afterEpisodes.memos).filter(([, m]) => !(m.parentType === 'PROJECT' && m.parentId === id))
        ),
      };
    }

    case 'REORDER_PROJECTS': {
      const { bookshelfId, newOrder } = action.payload; const ts = now();
      return { ...state, bookshelves: { ...state.bookshelves, [bookshelfId]: { ...state.bookshelves[bookshelfId], projectOrder: newOrder, updatedAt: ts } } };
    }

    case 'ADD_EPISODE': {
      const id = nanoid(); const ts = now();
      const { projectId, title } = action.payload;
      return {
        ...state,
        episodes: {
          ...state.episodes,
          [id]: {
            id, projectId, title, thumbnailUrl: null, status: 'draft', deadline: null,
            permissions: {}, settings: null, pageOrder: [], createdAt: ts, updatedAt: ts,
          },
        },
        projects: {
          ...state.projects,
          [projectId]: {
            ...state.projects[projectId],
            episodeOrder: [...state.projects[projectId].episodeOrder, id],
            updatedAt: ts,
          },
        },
      };
    }

    case 'UPDATE_EPISODE': {
      const { id, ...patch } = action.payload; const ts = now();
      return { ...state, episodes: { ...state.episodes, [id]: { ...state.episodes[id], ...patch, updatedAt: ts } } };
    }

    case 'DELETE_EPISODE': {
      const { id } = action.payload;
      const episode = state.episodes[id];
      if (!episode) return state;
      const ts = now();
      const afterEpisode = withEpisodeDeleted(state, id, ts);
      return {
        ...afterEpisode,
        projects: {
          ...afterEpisode.projects,
          [episode.projectId]: {
            ...afterEpisode.projects[episode.projectId],
            episodeOrder: afterEpisode.projects[episode.projectId].episodeOrder.filter(eid => eid !== id),
            updatedAt: ts,
          },
        },
      };
    }

    case 'REORDER_EPISODES': {
      const { projectId, newOrder } = action.payload; const ts = now();
      return { ...state, projects: { ...state.projects, [projectId]: { ...state.projects[projectId], episodeOrder: newOrder, updatedAt: ts } } };
    }

    case 'ADD_PAGE': {
      const id = nanoid(); const ts = now();
      const { episodeId, pageType = 'single' } = action.payload;
      return {
        ...state,
        pages: {
          ...state.pages,
          [id]: { id, episodeId, pageType, side: null, cutOrder: [], scriptSnippetOrder: [], createdAt: ts, updatedAt: ts },
        },
        episodes: {
          ...state.episodes,
          [episodeId]: {
            ...state.episodes[episodeId],
            pageOrder: [...state.episodes[episodeId].pageOrder, id],
            updatedAt: ts,
          },
        },
      };
    }

    case 'UPDATE_PAGE': {
      const { id, ...patch } = action.payload; const ts = now();
      return { ...state, pages: { ...state.pages, [id]: { ...state.pages[id], ...patch, updatedAt: ts } } };
    }

    case 'DELETE_PAGE': {
      const { id } = action.payload;
      const page = state.pages[id];
      if (!page) return state;
      const ts = now();
      const afterPage = withPageDeleted(state, id, ts);
      return {
        ...afterPage,
        episodes: {
          ...afterPage.episodes,
          [page.episodeId]: {
            ...afterPage.episodes[page.episodeId],
            pageOrder: afterPage.episodes[page.episodeId].pageOrder.filter(pid => pid !== id),
            updatedAt: ts,
          },
        },
      };
    }

    case 'REORDER_PAGES': {
      const { episodeId, newOrder } = action.payload; const ts = now();
      return { ...state, episodes: { ...state.episodes, [episodeId]: { ...state.episodes[episodeId], pageOrder: newOrder, updatedAt: ts } } };
    }

    case 'ADD_CUT': {
      const id = nanoid(); const ts = now();
      const { pageId, frame } = action.payload;
      return {
        ...state,
        cuts: { ...state.cuts, [id]: { id, pageId, frame, assetId: null, createdAt: ts, updatedAt: ts } },
        pages: {
          ...state.pages,
          [pageId]: { ...state.pages[pageId], cutOrder: [...state.pages[pageId].cutOrder, id], updatedAt: ts },
        },
      };
    }

    case 'UPDATE_CUT_FRAME': {
      const { id, frame } = action.payload; const ts = now();
      return { ...state, cuts: { ...state.cuts, [id]: { ...state.cuts[id], frame, updatedAt: ts } } };
    }

    case 'DELETE_CUT': {
      const { id } = action.payload;
      const cut = state.cuts[id];
      if (!cut) return state;
      const ts = now();
      const afterCut = withCutDeleted(state, id, ts);
      return {
        ...afterCut,
        pages: {
          ...afterCut.pages,
          [cut.pageId]: {
            ...afterCut.pages[cut.pageId],
            cutOrder: afterCut.pages[cut.pageId].cutOrder.filter(cid => cid !== id),
            updatedAt: ts,
          },
        },
      };
    }

    case 'REORDER_CUTS': {
      const { pageId, newOrder } = action.payload; const ts = now();
      return { ...state, pages: { ...state.pages, [pageId]: { ...state.pages[pageId], cutOrder: newOrder, updatedAt: ts } } };
    }

    case 'ADD_MEMO': {
      const id = nanoid(); const ts = now();
      return { ...state, memos: { ...state.memos, [id]: { id, ...action.payload, createdAt: ts, updatedAt: ts } } };
    }

    case 'UPDATE_MEMO': {
      const { id, ...patch } = action.payload; const ts = now();
      return { ...state, memos: { ...state.memos, [id]: { ...state.memos[id], ...patch, updatedAt: ts } } };
    }

    case 'DELETE_MEMO': {
      const { [action.payload.id]: _, ...memos } = state.memos;
      return { ...state, memos };
    }

    case 'ASSIGN_CUT_MEMO': {
      const { id, cutId } = action.payload; const ts = now();
      return { ...state, memos: { ...state.memos, [id]: { ...state.memos[id], parentId: cutId, updatedAt: ts } } };
    }

    case 'UNASSIGN_CUT_MEMO': {
      const ts = now();
      return { ...state, memos: { ...state.memos, [action.payload.id]: { ...state.memos[action.payload.id], parentId: null, updatedAt: ts } } };
    }

    case 'ADD_SCRIPT': {
      const id = nanoid(); const ts = now();
      return { ...state, scriptSnippets: { ...state.scriptSnippets, [id]: { id, ...action.payload, createdAt: ts, updatedAt: ts } } };
    }

    case 'UPDATE_SCRIPT': {
      const { id, ...patch } = action.payload; const ts = now();
      return { ...state, scriptSnippets: { ...state.scriptSnippets, [id]: { ...state.scriptSnippets[id], ...patch, updatedAt: ts } } };
    }

    case 'DELETE_SCRIPT': {
      const { [action.payload.id]: _, ...scriptSnippets } = state.scriptSnippets;
      return { ...state, scriptSnippets };
    }

    case 'ASSIGN_SCRIPT': {
      const { id, cutId } = action.payload; const ts = now();
      return { ...state, scriptSnippets: { ...state.scriptSnippets, [id]: { ...state.scriptSnippets[id], cutId, updatedAt: ts } } };
    }

    case 'UNASSIGN_SCRIPT': {
      const ts = now();
      return { ...state, scriptSnippets: { ...state.scriptSnippets, [action.payload.id]: { ...state.scriptSnippets[action.payload.id], cutId: null, updatedAt: ts } } };
    }

    default:
      return state;
  }
}

// ── Contexts ───────────────────────────────────────────────────────────────

const StoreContext    = createContext<NormalizedStore | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

interface UIContextValue {
  ui: UiState;
  setCurrentBookshelfId: (id: string) => void;
  setCurrentProjectId:   (id: string) => void;
  setCurrentEpisodeId:   (id: string) => void;
  setCurrentPageId:      (id: string) => void;
  setCurrentCutId:       (id: string | null) => void;
  toggleSidebar:         () => void;
  setSidebarOpen:        (open: boolean) => void;
  navigateToProject:     (projectId: string) => void;
  navigateToEpisode:     (episodeId: string) => void;
  navigateToPage:        (pageId: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, dispatch] = useReducer(storeReducer, INITIAL_STORE);
  const [ui, setUi] = useState<UiState>(INITIAL_UI);

  const uiValue: UIContextValue = {
    ui,
    setCurrentBookshelfId: (id) => setUi(prev => ({ ...prev, currentBookshelfId: id })),
    setCurrentProjectId:   (id) => setUi(prev => ({ ...prev, currentProjectId: id })),
    setCurrentEpisodeId:   (id) => setUi(prev => ({ ...prev, currentEpisodeId: id })),
    setCurrentPageId:      (id) => setUi(prev => ({ ...prev, currentPageId: id })),
    setCurrentCutId:       (id) => setUi(prev => ({ ...prev, currentCutId: id })),
    toggleSidebar:         ()   => setUi(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen })),
    setSidebarOpen:        (open) => setUi(prev => ({ ...prev, isSidebarOpen: open })),
    navigateToProject: (projectId) =>
      setUi(prev => ({ ...prev, currentProjectId: projectId, currentEpisodeId: null, currentPageId: null, currentCutId: null })),
    navigateToEpisode: (episodeId) =>
      setUi(prev => ({ ...prev, currentEpisodeId: episodeId, currentPageId: null, currentCutId: null })),
    navigateToPage: (pageId) =>
      setUi(prev => ({ ...prev, currentPageId: pageId, currentCutId: null })),
  };

  return (
    <StoreContext.Provider value={store}>
      <DispatchContext.Provider value={dispatch}>
        <UIContext.Provider value={uiValue}>
          {children}
        </UIContext.Provider>
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}

// ── Hooks ──────────────────────────────────────────────────────────────────

export function useStore(): NormalizedStore {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function useDispatch(): Dispatch<Action> {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useDispatch must be used within StoreProvider');
  return ctx;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within StoreProvider');
  return ctx;
}
