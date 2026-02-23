// 설정 및 권한 관련 타입

export type ReadingDirection = "ltr" | "rtl";
export type SpreadStart = "odd" | "even";
export type PageView = "single" | "spread";
export type Permission = "owner" | "editor" | "commentonly" | "readonly";

// 프로젝트에 저장되는 설정 (override 가능)
export interface ProjectSettings {
  defaultPageCount: number | null;
  spreadStart: SpreadStart | null;
  readingDirection: ReadingDirection | null;
  pageView: PageView | null;
  cutGridUnit: number;
}

// 에피소드에 저장되는 설정 (프로젝트 설정 상속 또는 override)
export interface EpisodeSettings {
  defaultPageCount: number | null;
  spreadStart: SpreadStart | null;
  readingDirection: ReadingDirection | null;
  pageView: PageView | null;
}

// 유저 전역 설정
export interface GlobalSettings {
  readingDirection: ReadingDirection;
  spreadStart: SpreadStart;
  pageView: PageView;
  SidebarOpen: boolean;
}

// 계층 병합 후 실효 설정값 (null 없음)
export interface Settings {
  defaultPageCount: number;
  readingDirection: ReadingDirection;
  spreadStart: SpreadStart;
  pageView: PageView;
  cutGridUnit?: number;
}
