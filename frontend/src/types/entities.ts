import type { Permission, ProjectSettings, EpisodeSettings } from './settings';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Vertex = [number, number];

export interface CutFrame {
  x: number;
  y: number;
  w: number;
  h: number;
  vertices?: Vertex[];
}

export interface Asset extends BaseEntity {
  url: string;
  mimeType: string;
}

export interface Bookshelf extends BaseEntity {
  ownerId: string;
  title: string;
  projectOrder: string[];
}

export interface Project extends BaseEntity {
  bookshelfId: string;
  title: string;
  coverImageAssetId: string | null;
  isFavorited: boolean;
  permissions: Record<string, Permission>;
  settings: ProjectSettings;
  episodeOrder: string[];
}

export type EpisodeStatus = 'draft' | 'inProgress' | 'done';

export interface Episode extends BaseEntity {
  projectId: string;
  title: string;
  thumbnailUrl: string | null;
  status: EpisodeStatus;
  deadline: string | null;
  permissions: Record<string, Permission>;
  settings: EpisodeSettings | null;
  pageOrder: string[];
}

export type PageType = 'single' | 'spread';
export type PageSide = 'left' | 'right';

export interface Page extends BaseEntity {
  episodeId: string;
  pageType: PageType;
  side: PageSide | null;
  cutOrder: string[];
  scriptSnippetOrder: string[];
}

export interface Cut extends BaseEntity {
  pageId: string;
  frame: CutFrame;
  assetId: string | null;
}

export type MemoParentType = 'PROJECT' | 'EPISODE' | 'PAGE' | 'CUT';
export type MemoRole = 'SINGLE' | 'DETAIL';

export interface Memo extends BaseEntity {
  parentId: string | null;
  parentType: MemoParentType;
  role: MemoRole;
  content: string;
  order: string;
  tags: string[];
  emoji: string | null;
}

export type ScriptType = 'dialog' | 'narration' | 'sfx' | 'action';

export interface ScriptSnippet extends BaseEntity {
  pageId: string;
  cutId: string | null;
  content: string;
  type: ScriptType;
  speakerId: string | null;
  order: string;
}
