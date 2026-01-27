// 권한 상수 (OWNER, EDITOR, ...)

// utils/constants/auth.js
export const AUTH_LEVELS = {
  READONLY: "readOnly",
  COMMENT_ONLY: "commentOnly",
  EDITOR: "editor",
  OWNER: "owner",
};

export const PERMISSIONS = {
  [AUTH_LEVELS.READONLY]: {
    canEdit: false,
    canComment: false,
    canDelete: false,
  },
  [AUTH_LEVELS.EDITOR]: {
    canEdit: true,
    canComment: true,
    canDelete: false,
  },
  // ...
};
