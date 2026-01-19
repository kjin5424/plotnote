import { nanoid } from "nanoid";

export const generatePageId = () => {
  return `pg-${nanoid(8)}`; // pg-A3bC9xY2
};

export const generateCutId = (pageId) => {
  return `${pageId}-${nanoid(6)}`; // pg-A3bC9xY2-ct-X7mN2k
};

export const generateEpisodeId = () => {
  return `ep-${nanoid(8)}`;
};

export const generateProjectId = () => {
  return `pr-${nanoid(8)}`;
};

export const generateUserId = () => {
  return `usr-${nanoid(10)}`;
};
