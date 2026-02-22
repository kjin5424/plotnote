import { nanoid } from "nanoid";

export const generatePageId = (): string => {
  return `pg-${nanoid(8)}`;
};

export const generateCutId = (pageId: string): string => {
  return `${pageId}-${nanoid(6)}`;
};

export const generateEpisodeId = (): string => {
  return `ep-${nanoid(8)}`;
};

export const generateProjectId = (): string => {
  return `pr-${nanoid(8)}`;
};

export const generateUserId = (): string => {
  return `usr-${nanoid(10)}`;
};
