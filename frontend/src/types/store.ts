import type {
  Bookshelf,
  Project,
  Episode,
  Page,
  Cut,
  Memo,
  ScriptSnippet,
  Asset,
} from './entities';

export interface NormalizedStore {
  bookshelves:    Record<string, Bookshelf>;
  projects:       Record<string, Project>;
  episodes:       Record<string, Episode>;
  pages:          Record<string, Page>;
  cuts:           Record<string, Cut>;
  memos:          Record<string, Memo>;
  scriptSnippets: Record<string, ScriptSnippet>;
  assets:         Record<string, Asset>;
}
