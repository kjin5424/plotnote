// 유저, 권한 관련 타입
import type { GlobalSettings } from "./settings";

export interface User {
  userId: string;
  displayName: string;
  email: string;
  globalSettings: GlobalSettings;
  favoritedProjectIds: string[];  // 즐겨찾기 (사용자마다 독립적)
}

export interface SharedBookshelf {
  bookshelfId: string;  // 공유받은 책장 ID
  permission: string;
}

export interface UserBookshelves {
  owned: string[];
  shared: SharedBookshelf[];
}
