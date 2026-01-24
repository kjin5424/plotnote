import {
  PAGE_VIEW,
  READING_DIRECTION,
  SPREAD_START,
} from "utils/constants/layout";

export const DEFAULT_SETTINGS = {
  defaultPageCount: 24,
  readingDirection: READING_DIRECTION.RTL,
  spreadStart: SPREAD_START.ODD,
  pageView: PAGE_VIEW.SPREAD,
  sidebarOpen: true,
  zoom: 1.0,
};

export default DEFAULT_SETTINGS;
